
package com.ssafy.suquiz.word.repository;

import com.ssafy.suquiz.word.domain.Subject;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject findBySubjectName(String subjectName);

    boolean existsBySubjectName(String subjectName);
}
