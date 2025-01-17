
package com.ssafy.suquiz.word.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

//@Builder(toBuilder = true) // 수정을 하고 싶을 때 toBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class Subject {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "subject")
//    @Builder.Default
    private List<Word> wordList = new ArrayList<>();

    private String subjectName;

    @Builder
    public Subject(String subjectName) {
        this.subjectName = subjectName;
    }

    // wordList에 대한 생성 메서드
    public List<String> getWordListNames() {
        List<String> wordListNames = new ArrayList<>();
        for (Word word : wordList) {
            wordListNames.add(word.getWordName());
        }
        return wordListNames;
    }

}
