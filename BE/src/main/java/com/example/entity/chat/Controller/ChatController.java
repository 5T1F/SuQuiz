package com.example.entity.chat.Controller;

import com.example.entity.chat.domain.Message;
import com.example.entity.chat.dto.MessageDTO;
import com.example.entity.chat.service.MessageService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    private final ObjectMapper objectMapper;



    @MessageMapping("chat/send/{userId}/{friendId}")
    public String sendMessage(@Payload MessageDTO messageDTO, @DestinationVariable String userId, @DestinationVariable String friendId) throws JsonProcessingException{
        Message savedMessage = messageService.saveMessage(messageDTO); // 메시지 저장

        MessageDTO response = MessageDTO.builder()
                .senderId(savedMessage.getSender().getId())
                .receiverId(savedMessage.getReceiver().getId())
                .content(savedMessage.getContent())
                .timestamp(savedMessage.getTimestamp())
                .build();
        String jsonMessage = objectMapper.writeValueAsString(response);
        String dest = "/user/"+ friendId +"/queue/messages";

        messagingTemplate.convertAndSend(
                dest,
                jsonMessage); // 수신자에게 메시지 전송

        return jsonMessage;
    }


}
