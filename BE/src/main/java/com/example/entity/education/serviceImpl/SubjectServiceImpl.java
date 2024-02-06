package com.example.entity.education.serviceImpl;

import com.example.entity.bookmark.dto.BookmarkDTO;
import com.example.entity.bookmark.service.BookmarkService;
import com.example.entity.bookmark.serviceImpl.BookmarkServiceImpl;
import com.example.entity.education.dto.WordDTO;
import com.example.entity.word.domain.Subject;
import com.example.entity.education.dto.SubjectDTO;
import com.example.entity.global.service.EntityAndDtoConversionService;
import com.example.entity.education.service.SubjectService;
import com.example.entity.word.domain.Word;
import com.example.entity.word.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;
    private final EntityAndDtoConversionService conversionService;
    private final BookmarkService bookmarkService;

    @Override
    public List<SubjectDTO.AllSubject> findAll() {
        List<Subject> list = subjectRepository.findAll();
        List<SubjectDTO.AllSubject> newList = new ArrayList<>();
        for (Subject subject : list) {
            newList.add(SubjectDTO.AllSubject.builder().subjectName(subject.getSubjectName()).build());
        }
        return newList;
    }

    @Override
    public SubjectDTO.Response findAllSubWith(long userId, String subjectName) throws Exception {
        Subject findSubject = subjectRepository.findBySubjectName(subjectName);
        BookmarkDTO.checkResponse allByUserId = bookmarkService.findAllByUserId(userId);
        SubjectDTO.Response resList = conversionService.findSubjectEntityToDto(findSubject);
        for( WordDTO.WordResponseDto word : resList.getWordList()) {
            for(int j=0; j<allByUserId.getWordList().size(); j++) {
                WordDTO.WordResponseDto bookmarkword = allByUserId.getWordList().get(j);
                if(word.getWordName().equals(bookmarkword.getWordName()))
                    word.updateBookmark();
            }
        }

        return resList;
    }
}
