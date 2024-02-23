package com.ssafy.suquiz.education.serviceImpl;

import com.ssafy.suquiz.word.domain.Category;
import com.ssafy.suquiz.word.domain.Word;
import com.ssafy.suquiz.education.dto.WordDTO;
import com.ssafy.suquiz.global.service.EntityAndDtoConversionService;
import com.ssafy.suquiz.education.service.WordService;
import com.ssafy.suquiz.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;
    private final EntityAndDtoConversionService conversionService;

    @Override
    public List<WordDTO.WordResponseDto> findAllWords() {
        List<Word> findList = wordRepository.findAll();
        List<WordDTO.WordResponseDto> responseDtos = new ArrayList<>();

        for (Word words : findList) {
            responseDtos.add(conversionService.WordEntityToDto(words));
        }
        return responseDtos;
    }


    @Override
    public List<WordDTO.WordResponseDto> findWordsByCategory(Category category) {
        List<Word> findWords = wordRepository.findByCategory(category);
        List<WordDTO.WordResponseDto> list = new ArrayList<>();
        for (Word word : findWords) {
            list.add(conversionService.WordEntityToDto(word));
        }
        return list;
    }
}

