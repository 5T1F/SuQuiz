package com.ssafy.suquiz.singleplay.domain;


import com.ssafy.suquiz.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class SingleHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "single_history_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate createDate;

    private int trialCount;
    private String resultText;
    private boolean isCorrect;
}
