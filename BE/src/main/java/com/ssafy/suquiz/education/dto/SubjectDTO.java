package com.ssafy.suquiz.education.dto;

import lombok.*;

import java.util.List;

public class SubjectDTO {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request {
        private String subjectName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AllSubject {
        private String subjectName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String subjectName;
        private List<WordDTO.WordResponseDto> wordList;

    }
}
