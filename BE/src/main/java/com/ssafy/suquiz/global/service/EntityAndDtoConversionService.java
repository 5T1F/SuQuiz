package com.ssafy.suquiz.global.service;

import com.ssafy.suquiz.friend.dto.FriendDto;
import com.ssafy.suquiz.ranking.dto.RankingDto;
import com.ssafy.suquiz.user.repository.UserRepository;
import com.ssafy.suquiz.singleplay.domain.SingleHistory;
import com.ssafy.suquiz.singleplay.dto.SingleHistoryDto;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.word.domain.Subject;
import com.ssafy.suquiz.word.domain.Word;
import com.ssafy.suquiz.bookmark.domain.Bookmark;
import com.ssafy.suquiz.bookmark.dto.BookmarkDTO;

import com.ssafy.suquiz.education.dto.SubjectDTO;
import com.ssafy.suquiz.education.dto.WordDTO;
import com.ssafy.suquiz.word.repository.SubjectRepository;
import com.ssafy.suquiz.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EntityAndDtoConversionService {

    private final UserRepository userRepository;
    private final WordRepository wordRepository;

    // Subject Conversion
    public SubjectDTO.Response findSubjectEntityToDto(Subject subject) {
        return SubjectDTO.Response.builder()
                .subjectName(subject.getSubjectName())
                .wordList(mapWordEntitiesToDto(subject.getWordList()))
                .build();
    }

    public List<WordDTO.WordResponseDto> mapWordEntitiesToDto(List<Word> wordList) {
        return wordList.stream()
                .map(word -> WordDTO.WordResponseDto.builder().wordName(word.getWordName()).subjectName(word.getSubject().getSubjectName()).category(word.getCategory().name()).videoUrl(word.getVideoUrl()).build())
                .collect(Collectors.toList());
    }

    // Word Conversion
    public WordDTO.WordResponseDto WordEntityToDto(Word entity) {
        return WordDTO.WordResponseDto.builder()
                .wordName(entity.getWordName())
                .category(entity.getCategory().name())
                .subjectName(entity.getSubject().getSubjectName())
                .videoUrl(entity.getVideoUrl())
                .build();
    }

    public Word WordDtoToEntity(WordDTO.WordRequestDto requestDto) {
        Subject subject = new Subject(requestDto.getSubjectName());

        return Word.builder()
                .category(requestDto.getCategory())
                .wordName(requestDto.getWordName())
                .subject(subject)
                .build();
    }

    // dto -> entity
    public SingleHistory singleHistorySaveDtoToEntity(SingleHistoryDto.SaveRequest singleHistorySaveRequestDto) {

        Optional<User> user = userRepository.findById(singleHistorySaveRequestDto.getUserId());

        if (user.isPresent()) {
            return SingleHistory.builder()
                    .user(user.get())
                    .trialCount(singleHistorySaveRequestDto.getTrialCount())
                    .isCorrect(singleHistorySaveRequestDto.isCorrect())
                    .resultText(singleHistorySaveRequestDto.getResultText())
                    .createDate(LocalDate.now())
                    .build();
        } else {
            return new SingleHistory();
        }
    }

    // entity -> dto
    public SingleHistoryDto.SaveResponse singleHistorySaveEntityToDto(SingleHistory singleHistory) {
        return SingleHistoryDto.SaveResponse.builder()
                .userId(singleHistory.getUser().getId())
                .trialCount(singleHistory.getTrialCount())
                .correct(singleHistory.isCorrect())
                .resultText(singleHistory.getResultText())
                .build();
    }

    // Bookmark Conversion
    public Bookmark addBookmarkDtoToEntity(BookmarkDTO.addRequest addRequest) {

        Optional<User> findUser = userRepository.findById(addRequest.getUserId());
        Word findWord = wordRepository.findByWordName(addRequest.getWordName());

        return findUser.map(user -> Bookmark.builder()
                .user(user)
                .word(findWord)
                .build()).orElse(null);
    }

    public BookmarkDTO.checkResponse checkBookmarkEntityToDto(List<Bookmark> bookmarks) {

        List<WordDTO.WordResponseDto> wordDtoList = convertWordListToDtoList(bookmarks);
        return BookmarkDTO.checkResponse.builder()
                .wordList(wordDtoList)
                .build();
    }

    public List<WordDTO.WordResponseDto> convertWordListToDtoList(List<Bookmark> bookmarks) {
        return bookmarks.stream()
                .map(bookmark -> WordDTO.WordResponseDto.builder()
                        .wordName(bookmark.getWord().getWordName())
                        .subjectName(bookmark.getWord().getSubject().getSubjectName())
                        .category(bookmark.getWord().getCategory().name())
                        .videoUrl(bookmark.getWord().getVideoUrl())
                        .isBookmarked(true)
                        .build())
                .collect(Collectors.toList());
    }

    public FriendDto.Response userEntityToFriendDtoResponse(User user) {
        return FriendDto.Response.builder().friendId(user.getId()).nickname(user.getNickname()).level(user.getLevel()).build();
    }

    public RankingDto.RankDto userEntityToRankDto(User user) {
        return RankingDto.RankDto.builder()
                .exp(user.getXp())
                .level(user.getLevel())
                .nickname(user.getNickname())
                .build();
    }

}
