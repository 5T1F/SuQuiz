package com.example.entity.education.controller;

import com.example.entity.bookmark.dto.BookmarkDTO;
import com.example.entity.bookmark.service.BookmarkService;
import com.example.entity.education.dto.SubjectDTO;
import com.example.entity.word.domain.Category;
import com.example.entity.education.dto.WordDTO;
import com.example.entity.education.service.WordService;
import com.example.entity.global.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/word")
@RequiredArgsConstructor
public class WordController {
    private final WordService wordService;
    private final BookmarkService bookmarkService;

    @GetMapping("/all")
    public ResponseEntity<CommonResponse> allWords() {
        List<WordDTO.WordResponseDto> allWords = wordService.findAllWords();
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("단어 조회 성공")
                .data(allWords)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/categoryWords/{userId}")
    public ResponseEntity<CommonResponse> wordsfromCategory(@PathVariable long userId, @RequestParam("category") String categoryParam) {
        Category category = Category.valueOf(categoryParam.toUpperCase()); // 대소문자 구분 없이 처리
        List<WordDTO.WordResponseDto> wordsInCategory = wordService.findWordsByCategory(category);

        BookmarkDTO.checkResponse allByUserId = bookmarkService.findAllByUserId(userId);

        for( WordDTO.WordResponseDto word : wordsInCategory) {
            for(int j=0; j<allByUserId.getWordList().size(); j++) {
                WordDTO.WordResponseDto bookmarkword = allByUserId.getWordList().get(j);
                if(word.getWordName().equals(bookmarkword.getWordName()))
                    word.updateBookmark();
            }
        }

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("카테고리별 단어 조회 성공")
                .data(wordsInCategory)
                .build(), HttpStatus.OK);
    }

}
