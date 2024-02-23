package com.ssafy.suquiz.chat.Controller;

import com.ssafy.suquiz.chat.dto.MessageDTO;
import com.ssafy.suquiz.chat.service.MessageService;
import com.ssafy.suquiz.global.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;


    @GetMapping("/history/{userId}/{friendId}")
    public ResponseEntity<CommonResponse>  getMessageHistory(@PathVariable Long userId, @PathVariable Long friendId) {
        List<MessageDTO> res = messageService.getMessageHistory(userId, friendId);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("메시지 기록 조회 성공")
                .data(res)
                .build(), HttpStatus.OK);
    }
    @PostMapping("/markAsRead/{userId}/{friendId}")
    public ResponseEntity<?> markMessagesAsRead(@PathVariable Long userId, @PathVariable Long friendId) {
        messageService.markMessagesAsRead(userId, friendId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recent/{userId}")
    public ResponseEntity<?> getMostRecentMessageByUserId(@PathVariable Long userId) {
        return messageService.findMostRecentMessageByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

