package com.ssafy.suquiz.bookmark.controller;

import com.ssafy.suquiz.bookmark.dto.BookmarkDTO;
import com.ssafy.suquiz.bookmark.service.BookmarkService;
import com.ssafy.suquiz.global.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping("/words/{userId}")
    public ResponseEntity<CommonResponse> allWordsByUser(@PathVariable("userId") Long userId) {
        BookmarkDTO.checkResponse allByUser = bookmarkService.findAllByUserId(userId);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("유저가 북마크한 모든 단어 조회 성공")
                .data(allByUser)
                .build(), HttpStatus.OK);
    }

    @PostMapping("/words")
    public ResponseEntity<CommonResponse> addWordsByUser(@RequestBody BookmarkDTO.addRequest request) {
        Long userId = request.getUserId();
        String wordName = request.getWordName();
        bookmarkService.addWordsByUser(userId, wordName);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("북마크에 단어 추가")
                .data(BookmarkDTO.addResponse.builder().isBookmarked(true).build())
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/words")
    public ResponseEntity<CommonResponse> deleteWordsByUser(@RequestBody BookmarkDTO.deleteRequest request) {
        Long userId = request.getUserId();
        String wordName = request.getWordName();
        bookmarkService.deleteWordsByUser(userId, wordName);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("북마크에서 단어 삭제")
                .data(BookmarkDTO.deleteResponse.builder().isBookmarked(false).build())
                .build(), HttpStatus.OK);
    }
}
