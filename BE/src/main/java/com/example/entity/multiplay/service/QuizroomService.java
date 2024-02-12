package com.example.entity.multiplay.service;

import com.example.entity.education.dto.WordDTO;
import com.example.entity.multiplay.dto.EndQuizDto;
import com.example.entity.multiplay.dto.ExitQuizDto;
import com.example.entity.multiplay.dto.PlayerDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface QuizroomService {
    void makeQuizroom(Long userId, String sessionId, String inviteCode);

    boolean checkIsRoomJoinable(String inviteCode);

    boolean checkIsRoomPlaying(String inviteCode);


    List<WordDTO.WordResponseDto> startQuizroom(String sessionId);

    List<EndQuizDto.Response> endQuizgame(String sessionId, List<EndQuizDto.Request> requests);

    void exitQuizroom(ExitQuizDto.Request req);

    void joinQuizroom(String sessionId, long userId);

    List<PlayerDto.Response> getPlayers(String sessionId);
}
