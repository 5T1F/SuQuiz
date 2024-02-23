package com.ssafy.suquiz.singleplay.repository;

import com.ssafy.suquiz.singleplay.domain.SingleHistory;
import com.ssafy.suquiz.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SingleHistoryRepository extends JpaRepository<SingleHistory, Long> {
    List<SingleHistory> findAllByUser(User user);
    SingleHistory findByCreateDate(LocalDate localDate);
    SingleHistory findByUserAndCreateDate(User user, LocalDate localDate);
}
