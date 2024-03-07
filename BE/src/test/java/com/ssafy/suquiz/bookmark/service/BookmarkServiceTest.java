package com.ssafy.suquiz.bookmark.service;


import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.ssafy.suquiz.bookmark.repository.BookmarkRepository;
import com.ssafy.suquiz.bookmark.service.BookmarkService;
import com.ssafy.suquiz.bookmark.serviceImpl.BookmarkServiceImpl;
import com.ssafy.suquiz.global.dto.CommonResponse;
import com.ssafy.suquiz.user.domain.OAuthProvider;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import com.ssafy.suquiz.word.domain.Category;
import com.ssafy.suquiz.word.domain.Subject;
import com.ssafy.suquiz.word.domain.Word;
import com.ssafy.suquiz.word.repository.SubjectRepository;
import com.ssafy.suquiz.word.repository.WordRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookmarkServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private WordRepository wordRepository;
    @Mock
    private SubjectRepository subjectRepository;
    @Mock
    private BookmarkRepository bookmarkRepository;
    @InjectMocks
    private BookmarkServiceImpl bookmarkService;


    public static class TestResponseDto {
        private Object data;
    }

    @Test
    @DisplayName("유저가 추가한 북마크 단어")
    void addBookmark() {

        User user = User.builder()
                .id(1L)
                .email("test123@test.com")
                .nickname("테스트1")
                .oAuthProvider(OAuthProvider.KAKAO)
                .imageUrl("1q2w3e4r")
                .build();

        Subject subject = Subject.builder()
                .subjectName("테스트주제")
                .build();

        Word word = Word.builder()
                .id(1L)
                .videoUrl("AAA")
                .wordName("입력")
                .subject(subject)
                .category(Category.낱말)
                .build();

        when(userRepository.findById(any(Long.class)))
                .thenReturn(Optional.ofNullable(user));

        when(wordRepository.findByWordName(any(String.class)))
                .thenReturn(word);

        bookmarkService.addWordsByUser(user.getId(), word.getWordName());

        verify(bookmarkRepository, times(1)).save(any());
    }
}
