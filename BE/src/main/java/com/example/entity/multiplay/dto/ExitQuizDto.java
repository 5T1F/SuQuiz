package com.example.entity.multiplay.dto;

import com.example.entity.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
