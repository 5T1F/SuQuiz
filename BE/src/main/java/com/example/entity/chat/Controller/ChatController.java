//package com.example.entity.chat.Controller;
//
//import com.example.entity.chat.domain.Message;
//import com.example.entity.chat.dto.MessageDTO;
//import com.example.entity.chat.service.MessageService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//
//@Controller
//@RequiredArgsConstructor
//public class ChatController {
//
//    private final SimpMessagingTemplate messagingTemplate;
//    private final MessageService messageService;
//
//
//
//    @MessageMapping("/chat/send")
//    public void sendMessage(@Payload MessageDTO messageDTO) {
//        Message savedMessage = messageService.saveMessage(messageDTO); // 메시지 저장 로직
//        messagingTemplate.convertAndSendToUser(
//                savedMessage.getReceiver().getId().toString(),
//                "/queue/messages",
//                new MessageDTO(savedMessage)); // 수신자에게 메시지 전송
//    }
//}
