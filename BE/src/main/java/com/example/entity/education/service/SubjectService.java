package com.example.entity.education.service;

import com.example.entity.education.dto.SubjectDTO;

import java.util.List;

public interface SubjectService {

    SubjectDTO.Response findAllSubWith(long userId, String subjectName) throws Exception;

    List<SubjectDTO.AllSubject> findAll();

}