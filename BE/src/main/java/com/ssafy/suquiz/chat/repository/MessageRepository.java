package com.ssafy.suquiz.chat.repository;

import com.ssafy.suquiz.chat.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.sender.id = ?1 AND m.receiver.id = ?2) OR (m.sender.id = ?2 AND m.receiver.id = ?1) ORDER BY m.timestamp ASC")
    List<Message> findMessagesBetweenUsers(Long userId, Long friendId);

    List<Message> findMessagesByReceiverIdAndSenderIdAndIsReadIsFalse(Long userId, Long friendId);
    @Query("SELECT m FROM Message m WHERE m.sender.id = :userId OR m.receiver.id = :userId ORDER BY m.timestamp DESC")
    Optional<Message> findMostRecentMessageByUserId(Long userId);
}
