package com.ssafy.suquiz.bookmark.repository;

import com.ssafy.suquiz.bookmark.domain.Bookmark;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.word.domain.Word;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @EntityGraph(attributePaths = {"user", "word.subject", "word.category"})
    List<Bookmark> findAllByUser(User user);

    Bookmark findAllByUserAndWord(User user, Word word);


}
