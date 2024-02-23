package com.ssafy.suquiz.multiplay.repository;

import com.ssafy.suquiz.multiplay.domain.Quizroom;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizroomRepository extends JpaRepository<Quizroom, Long> {


    @EntityGraph(attributePaths = {"userList"})
    Optional<Quizroom> findById(long id);

    @EntityGraph(attributePaths = {"userList"})
    Optional<Quizroom> findByInviteCode(String inviteCode);


    @EntityGraph(attributePaths = {"userList"})
    Optional<Quizroom> findBySessionId(String sessionId);
}
