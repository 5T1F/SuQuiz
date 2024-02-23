package com.ssafy.suquiz.chat.service;

import com.ssafy.suquiz.chat.domain.Message;
import com.ssafy.suquiz.chat.dto.MessageDTO;
import com.ssafy.suquiz.chat.repository.MessageRepository;
import com.ssafy.suquiz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;


    public List<MessageDTO> getMessageHistory(Long userId, Long friendId) {
        List<Message> messages = messageRepository.findMessagesBetweenUsers(userId, friendId);
        return messages.stream().map(message -> MessageDTO.builder()
                .senderId(message.getSender().getId())
                .receiverId(message.getReceiver().getId())
                .content(message.getContent())
                .timestamp(message.getTimestamp())
                .isRead(message.isRead())
                .build()).collect(Collectors.toList());
    }

    public void markMessagesAsRead(Long userId, Long friendId) {
        List<Message> messages = messageRepository.findMessagesByReceiverIdAndSenderIdAndIsReadIsFalse(userId, friendId);
        messages.forEach(message -> {
            message.markAsRead();
            messageRepository.save(message);
        });
    }

    public Message saveMessage(MessageDTO messageDTO) {
        Message message = Message.builder()
                .sender(userRepository.findById(messageDTO.getSenderId()).orElseThrow())
                .receiver(userRepository.findById(messageDTO.getReceiverId()).orElseThrow())
                .content(messageDTO.getContent())
                .timestamp(LocalDateTime.now())
                .isRead(false)
                .build();
        return messageRepository.save(message);
    }

    public Optional<MessageDTO> findMostRecentMessageByUserId(Long userId) {
        return messageRepository.findMostRecentMessageByUserId(userId)
                .map(this::convertToMessageDTO);
    }

    private MessageDTO convertToMessageDTO(Message message) {
        // 실제 변환 로직 구현, 예시:
        return new MessageDTO(
                message.getSender().getId(),
                message.getReceiver().getId(),
                message.getContent(),
                message.getTimestamp(),
                message.isRead()
        );
    }


}

