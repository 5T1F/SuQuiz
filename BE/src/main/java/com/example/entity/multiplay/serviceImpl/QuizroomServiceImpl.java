package com.example.entity.multiplay.serviceImpl;

import com.example.entity.education.dto.WordDTO;
import com.example.entity.global.service.EntityAndDtoConversionService;
import com.example.entity.multiplay.domain.Quizroom;
import com.example.entity.multiplay.dto.EndQuizDto;
import com.example.entity.multiplay.dto.ExitQuizDto;
import com.example.entity.multiplay.repository.QuizroomRepository;
import com.example.entity.multiplay.service.QuizroomService;
import com.example.entity.user.domain.Level;
import com.example.entity.user.domain.User;
import com.example.entity.user.repository.LevelRepository;
import com.example.entity.user.repository.UserRepository;
import com.example.entity.word.domain.Category;
import com.example.entity.word.domain.Word;
import com.example.entity.word.repository.WordRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
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

            if (user.getQuizroom() == null) {
                Quizroom quizroom = Quizroom.builder().sessionId(sessionId).inviteCode(inviteCode).build();
                quizroomRepository.save(quizroom);
                user.changeQuizroom(quizroom);
                quizroom.addUser(user);
                System.out.println("남은 유저 : " + quizroom.getUserList().size() );
            }

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
    public List<WordDTO.WordResponseDto> startQuizroom(Long quizroomId) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findById(quizroomId);

        if (optionalQuizroom.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            quizroom.updateIsPlaying();
            List<User> userList = quizroom.getUserList();

            for (User user : userList) {
                user.updateIsPlaying();
            }

            List<Word> allWord = wordRepository.findByCategory(Category.낱말);
            List<Word> selectedWords = new ArrayList<>();
            Random random = new Random();
            for (int i = 0; i < 3; i++) {
                int randomIndex = random.nextInt(allWord.size());
                Word randomWord = allWord.get(randomIndex);
                selectedWords.add(randomWord);
                allWord.remove(randomIndex);
            }

            List<WordDTO.WordResponseDto> wordList = entityAndDtoConversionService.mapWordEntitiesToDto(selectedWords);
            return wordList;
        }

        return null;
    }
    
    // 게임 종료
    @Override
    public List<EndQuizDto.Response> endQuizgame(Long quizroomId, List<EndQuizDto.Request> requests) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findById(quizroomId);
        List<EndQuizDto.Response> resultList = new ArrayList<>();

        if (optionalQuizroom.isPresent()) {
            // 퀴즈룸 종료로 변환
            Quizroom quizroom = optionalQuizroom.get();
            if (quizroom.isPlaying())
                quizroom.updateIsPlaying();

            // 스코어에 따라 각 유저의 경험치 및 레벨 변화
            for (EndQuizDto.Request rq : requests) {
                Optional<User> optionalUser = userRepository.findById(rq.getUserId());
                if (optionalUser.isPresent()) {
                    // 경험치 업데이트
                    User user = optionalUser.get();
                    int score = rq.getScore();
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
                    resultList.add(EndQuizDto.Response.builder()
                            .userId(user.getId())
                            .exp(user.getXp())
                            .level(user.getLevel())
                            .build());
                }
            }


        }

        return resultList;
    }

    //게임방 퇴장하기
    @Override
    @Transactional
    public void exitQuizroom(ExitQuizDto.Request req) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findBySessionId(req.getSessionId());

        if(optionalQuizroom.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            List<User> userList = quizroom.getUserList();
            for(User u : userList) {
                if(u.getId()==req.getUserId()) {
                    u.changeQuizroom(null);
                    userList.remove(u);
                    break;
                }
            }
            System.out.println("남은 유저 : " + userList.size() );
            if(userList.isEmpty()) {
              quizroomRepository.delete(quizroom);
            }
        }

    }

    @Override
    @Transactional
    public void joinQuizroom(String sessionId, long userId) {
        Optional<Quizroom> optionalQuizroom = quizroomRepository.findBySessionId(sessionId);
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalQuizroom.isPresent()&&optionalUser.isPresent()) {
            Quizroom quizroom = optionalQuizroom.get();
            System.out.println("기존 유저 : " + quizroom.getUserList().size() );
            User user = optionalUser.get();
            quizroom.addUser(user);
            user.changeQuizroom(quizroom);
            System.out.println("남은 유저 : " + quizroom.getUserList().size() );
        }
    }


}
