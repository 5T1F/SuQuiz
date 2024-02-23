package com.ssafy.suquiz.word.repository;

import com.ssafy.suquiz.word.domain.Category;
import com.ssafy.suquiz.word.domain.Subject;
import com.ssafy.suquiz.word.domain.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    Word findByWordName(String wordName);

    List<Word> findAll();


    @Query(" select w from Word w where w.category = :category")
    List<Word> findByCategory(@Param("category") Category category);

    List<Word> findBySubject(Subject subject);
}
