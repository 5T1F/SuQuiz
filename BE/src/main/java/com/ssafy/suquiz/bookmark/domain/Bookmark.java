package com.ssafy.suquiz.bookmark.domain;

import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.word.domain.Word;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class Bookmark { // user - word

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "word_id")
    private Word word;
}
