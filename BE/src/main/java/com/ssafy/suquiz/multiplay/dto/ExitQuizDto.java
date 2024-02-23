package com.ssafy.suquiz.multiplay.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ExitQuizDto {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor

    public static class Request {
        String sessionId;
        Long userId;
    }


}
