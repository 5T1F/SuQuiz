package com.ssafy.suquiz.multiplay.serviceImpl;

import com.ssafy.suquiz.global.service.EntityAndDtoConversionService;
import com.ssafy.suquiz.multiplay.domain.Quizroom;
import com.ssafy.suquiz.multiplay.dto.EndQuizDto;
import com.ssafy.suquiz.multiplay.dto.ExitQuizDto;
import com.ssafy.suquiz.multiplay.dto.PlayerDto;
import com.ssafy.suquiz.multiplay.repository.QuizroomRepository;
import com.ssafy.suquiz.multiplay.service.QuizroomService;
import com.ssafy.suquiz.singleplay.dto.QuestDto;
import com.ssafy.suquiz.user.domain.Level;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.LevelRepository;
import com.ssafy.suquiz.user.repository.UserRepository;
import com.ssafy.suquiz.word.domain.Category;
import com.ssafy.suquiz.word.domain.Word;
import com.ssafy.suquiz.word.function.WordToSyllables;
import com.ssafy.suquiz.word.repository.WordRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class QuizroomServiceImpl implements QuizroomService {
    private final QuizroomRepository quizroomRepository;
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final LevelRepository levelRepository;
    private final EntityAndDtoConversionService entityAndDtoConversionService;

    @Override
    @Transactional
    public void makeQuizroom(Long userId, String sessionId, String inviteCode) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();


            Quizroom quizroom = Quizroom.builder().sessionId(sessionId).inviteCode(inviteCode).build();
            quizroomRepository.save(quizroom);
            user.changeQuizroom(quizroom);
            quizroom.addUser(user);


        }


    }

    // 4명 이하로 입장 가능한지 조회
    @Override
    public boolean checkIsRoomJoinable(String inviteCode) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findByInviteCode(inviteCode);
        if (optionalQuizroom.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            if (quizroom.getUserList().size() < 4)
                return true;
        }

        return false;
    }

    // 게임이 플레이중인지 조회
    @Override
    public boolean checkIsRoomPlaying(String inviteCode) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findByInviteCode(inviteCode);
        if (optionalQuizroom.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            return quizroom.isPlaying();
        }

        return false;
    }

    //게임 시작
    @Override
    @Transactional
    public void startQuizroom(String sessionId) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findBySessionId(sessionId);

        if (optionalQuizroom.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            quizroom.updateIsPlaying();
            List<User> userList = quizroom.getUserList();

            for (User user : userList) {
                user.updateIsPlaying();
            }

        }
    }

    // 게임 종료
    @Override
    @Transactional
    public EndQuizDto.Response endQuizgame(String sessionId, EndQuizDto.Request rq) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findBySessionId(sessionId);

        if (optionalQuizroom.isPresent()) {
            // 퀴즈룸 종료로 변환
            Quizroom quizroom = optionalQuizroom.get();
            if (quizroom.isPlaying())
                quizroom.updateIsPlaying();

            // 스코어에 따라 각 유저의 경험치 및 레벨 변화
            Optional<User> optionalUser = userRepository.findById(rq.getUserId());
            if (optionalUser.isPresent()) {
                // 경험치 업데이트
                User user = optionalUser.get();
                int score = rq.getMyScore();
                user.addExp(score);


                // 레벨 업데이트
                int userLevel = user.getLevel();
                Optional<Level> optionalLevel = levelRepository.findByLevel(userLevel + 1);
                if (optionalLevel.isPresent()) {
                    Level nextLevel = optionalLevel.get();
                    if (user.getXp() >= nextLevel.getXp()) {
                        user.levelUp();
                        user.updateExp(user.getXp() - nextLevel.getXp());
                    }
                }

                // 결과 전송
                return EndQuizDto.Response.builder()
                        .userId(user.getId())
                        .exp(user.getXp())
                        .level(user.getLevel())
                        .build();
            }

        }
        return null;


    }

    //게임방 퇴장하기
    @Override
    @Transactional
    public void exitQuizroom(ExitQuizDto.Request req) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findBySessionId(req.getSessionId());

        if (optionalQuizroom.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            List<User> userList = quizroom.getUserList();
            for (User u : userList) {
                if (u.getId() == req.getUserId()) {
                    u.changeQuizroom(null);
                    userList.remove(u);
                    break;
                }
            }
            if (userList.isEmpty()) {
                quizroomRepository.delete(quizroom);
            }
        }

    }

    @Override
    @Transactional
    public void joinQuizroom(String sessionId, long userId) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findBySessionId(sessionId);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalQuizroom.isPresent() && optionalUser.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            User user = optionalUser.get();
            quizroom.addUser(user);
            user.changeQuizroom(quizroom);
        }
    }

    @Override
    public List<PlayerDto.Response> getPlayers(String sessionId) {
        Quizroom quizroom = quizroomRepository.findBySessionId(sessionId).get();
        List<User> userList = quizroom.getUserList();

        List<PlayerDto.Response> playerList = new ArrayList<>();
        for (User u : userList) {
            PlayerDto.Response res = PlayerDto.Response.builder()
                    .playerId(u.getId())
                    .playerNickname(u.getNickname())
                    .build();
            playerList.add(res);
        }

        return playerList;
    }

    @Override
    public List<QuestDto.DailyListResponse> multiQuest() {
        return findFivePhonemeList();
    }

    private List<QuestDto.DailyListResponse> findFivePhonemeList() {

        List<QuestDto.DailyListResponse> threeQuest = new ArrayList<>();

        List<Word> words = wordRepository.findByCategory(Category.낱말);

        // 랜덤으로 하나 선택
        if (!words.isEmpty()) {

            while (true) {
                Random random = new Random();
                int index = random.nextInt(words.size());
                Word word = words.get(index);

                char[] syllables = WordToSyllables.wordToSyllables(word.getWordName());
                if (syllables.length != 5) continue;

                List<Character> list = new ArrayList<>();
                for (char c : syllables) {
                    list.add(c);
                }

                boolean flag = true;
                for (QuestDto.DailyListResponse entity : threeQuest) {
                    if (entity.getWordName().equals(word.getWordName())) {
                        flag = false;
                    }
                }

                if (flag) {
                    threeQuest.add(QuestDto.DailyListResponse.builder()
                            .category(word.getCategory())
                            .subject(word.getSubject().getSubjectName())
                            .wordName(word.getWordName())
                            .videoUrl(word.getVideoUrl())
                            .syllables(list)
                            .build());
                }
                if (threeQuest.size() == 3) break;
            }
        }

        return threeQuest;
    }
}
