package com.example.entity.education.controller;

import com.example.entity.education.dto.SubjectDTO;
import com.example.entity.education.service.SubjectService;
import com.example.entity.global.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping("/allSub")
    public ResponseEntity<CommonResponse> AllSubject() {
        List<SubjectDTO.AllSubject> list = subjectService.findAll();
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("모든 주제 출력")
                .data(list)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<CommonResponse> AllWordWithSubject(@PathVariable long userId, @RequestParam(name = "subjectName") String subjectName) throws Exception {
        SubjectDTO.Response findSub = subjectService.findAllSubWith(userId, subjectName);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("주제에 관련된 내용 전부 조회")
                .data(findSub)
                .build(), HttpStatus.OK);
    }
}
