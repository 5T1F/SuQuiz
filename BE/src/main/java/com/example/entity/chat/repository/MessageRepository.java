package com.example.entity.chat.repository;

import com.example.entity.chat.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.sender.id = ?1 AND m.receiver.id = ?2) OR (m.sender.id = ?2 AND m.receiver.id = ?1) ORDER BY m.timestamp ASC")
    List<Message> findMessagesBetweenUsers(Long userId, Long friendId);

    List<Message> findMessagesByReceiverIdAndSenderIdAndIsReadIsFalse(Long userId, Long friendId);
}
