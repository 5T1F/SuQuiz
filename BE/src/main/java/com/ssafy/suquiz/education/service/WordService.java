package com.ssafy.suquiz.education.service;

import com.ssafy.suquiz.word.domain.Category;
import com.ssafy.suquiz.education.dto.WordDTO;

import java.util.List;

public interface WordService {

    List<WordDTO.WordResponseDto> findAllWords();

    List<WordDTO.WordResponseDto> findWordsByCategory(Category category);
}
