package com.ssafy.suquiz.education.service;

import com.ssafy.suquiz.education.dto.SubjectDTO;

import java.util.List;

public interface SubjectService {

    SubjectDTO.Response findAllSubWith(long userId, String subjectName) throws Exception;

    List<SubjectDTO.AllSubject> findAll();

}
