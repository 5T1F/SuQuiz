package com.example.entity.chat.Controller;

import com.example.entity.chat.dto.MessageDTO;
import com.example.entity.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;


    @GetMapping("/history/{userId}/{friendId}")
    public List<MessageDTO> getMessageHistory(@PathVariable Long userId, @PathVariable Long friendId) {
        return messageService.getMessageHistory(userId, friendId);
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

