package com.ssafy.suquiz.bookmark.dto;

import com.ssafy.suquiz.education.dto.WordDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class BookmarkDTO {
    // 유저에 대한 단어 조회
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class checkRequest {
        private String userEmail;
    }

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class checkResponse {
        private List<WordDTO.WordResponseDto> wordList;
    }
    
    // 유저에 단어 북마크 추가
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class addRequest {
        private Long userId;
        private String wordName;
        private Boolean isBookmarked;
    }

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class deleteRequest {
        private Long userId;
        private String wordName;
        private Boolean isBookmarked;
    }

    // 단어 추가 확인
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class addResponse {
        private Boolean isBookmarked;
    }

    // 단어 삭제 확인
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class deleteResponse {
        private Boolean isBookmarked;
    }

}
