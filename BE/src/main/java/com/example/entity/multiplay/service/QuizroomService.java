package com.example.entity.multiplay.service;

import com.example.entity.education.dto.WordDTO;
import com.example.entity.multiplay.dto.EndQuizDto;
import com.example.entity.multiplay.dto.ExitQuizDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface QuizroomService {
    void makeQuizroom(Long userId, String sessionId, String inviteCode);

    boolean checkIsRoomJoinable(String inviteCode);

    boolean checkIsRoomPlaying(String inviteCode);


    List<WordDTO.WordResponseDto> startQuizroom(Long quizroomId);

    List<EndQuizDto.Response> endQuizgame(Long quizroomId, List<EndQuizDto.Request> requests);

    void exitQuizroom(ExitQuizDto.Request req);

    void joinQuizroom(String sessionId, long userId);
}
