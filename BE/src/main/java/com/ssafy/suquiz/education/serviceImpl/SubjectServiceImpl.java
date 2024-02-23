package com.ssafy.suquiz.education.serviceImpl;

import com.ssafy.suquiz.bookmark.dto.BookmarkDTO;
import com.ssafy.suquiz.bookmark.service.BookmarkService;
import com.ssafy.suquiz.education.dto.WordDTO;
import com.ssafy.suquiz.word.domain.Subject;
import com.ssafy.suquiz.education.dto.SubjectDTO;
import com.ssafy.suquiz.global.service.EntityAndDtoConversionService;
import com.ssafy.suquiz.education.service.SubjectService;
import com.ssafy.suquiz.word.repository.SubjectRepository;
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
