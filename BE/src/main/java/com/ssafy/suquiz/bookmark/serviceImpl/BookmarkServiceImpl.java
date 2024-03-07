package com.ssafy.suquiz.bookmark.serviceImpl;

import com.ssafy.suquiz.bookmark.domain.Bookmark;
import com.ssafy.suquiz.bookmark.dto.BookmarkDTO;
import com.ssafy.suquiz.bookmark.repository.BookmarkRepository;
import com.ssafy.suquiz.bookmark.service.BookmarkService;
import com.ssafy.suquiz.global.service.EntityAndDtoConversionService;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import com.ssafy.suquiz.word.domain.Word;
import com.ssafy.suquiz.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {
    private final WordRepository wordRepository;
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;
    private final EntityAndDtoConversionService conversionService;

    @Override
    public BookmarkDTO.checkResponse findAllByUserId(long userId) {
        Optional<User> findUser = userRepository.findById(userId);
        if(findUser.isPresent()) {
            List<Bookmark> list = bookmarkRepository.findAllByUser(findUser.get());
            BookmarkDTO.checkResponse response = conversionService.checkBookmarkEntityToDto(list);
            return response;
        } else {
            // User가 없는 경우에 대한 처리
            return BookmarkDTO.checkResponse.builder()
                    .wordList(Collections.emptyList())  // 빈 리스트 또는 null로 설정
                    .build();
        }
    }

    @Override
    public void addWordsByUser(Long userId, String wordName) {
        Optional<User> findEmail = userRepository.findById(userId);
        Word findWord = wordRepository.findByWordName(wordName);
        Bookmark bookmark = Bookmark.builder()
                .word(findWord)
                .user(findEmail.get())
                .build();
        bookmarkRepository.save(bookmark);
    }

    @Override
    public void deleteWordsByUser(Long userId, String wordName) {
        Optional<User> findEmail = userRepository.findById(userId);
        Word findWord = wordRepository.findByWordName(wordName);
        Bookmark allByUserAndWord = bookmarkRepository.findAllByUserAndWord(findEmail.get(), findWord);

        bookmarkRepository.delete(allByUserAndWord);
    }
}
