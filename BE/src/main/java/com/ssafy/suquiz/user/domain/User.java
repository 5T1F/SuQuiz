
package com.ssafy.suquiz.user.domain;

import com.ssafy.suquiz.multiplay.domain.Quizroom;
import com.ssafy.suquiz.singleplay.domain.SingleHistory;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users") // 예약어 사용으로 인한 에러, => 테이블명 설정해줌
@Getter
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<SingleHistory> singleHistoryList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizroom_id")
    private Quizroom quizroom;

    private String nickname;

    @Builder.Default
    private int level = 1;
    @Builder.Default
    private int xp = 0;

    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;

    @Builder.Default
    private boolean isPlaying = false;
    @Builder.Default
    private int correctCount = 0;   // 최근 연속 정답
    @Builder.Default
    private int solveCount = 0;     // 최근 연속 풀이
    @Builder.Default
    private int maxCorrectCount = 0;// 최다 연속 정답

    private String imageUrl;

    public void changeNickname(String modifiedName) {
        this.nickname = modifiedName;
    }

    public void changeQuizroom(Quizroom quizroom) {
        this.quizroom = quizroom;
    }

    public void updateIsPlaying() {
        isPlaying = !isPlaying;
    }

    public void addExp(int score) {
        this.xp += score*5;
    }

    public void updateExp(int exp) {
        this.xp = exp;
    }

    public void levelUp() {
        this.level += 1;
    }
}
//