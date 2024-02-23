package com.ssafy.suquiz.chat.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {
    private Long senderId;
    private Long receiverId;
    private String content;
    private LocalDateTime timestamp;
    private boolean isRead;
}

