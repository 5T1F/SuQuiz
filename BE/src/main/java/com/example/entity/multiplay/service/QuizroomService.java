package com.example.entity.multiplay.service;

import com.example.entity.multiplay.dto.EndQuizDto;
import com.example.entity.multiplay.dto.ExitQuizDto;
import com.example.entity.multiplay.dto.PlayerDto;

import java.util.List;


public interface QuizroomService {
    void makeQuizroom(Long userId, String sessionId, String inviteCode);

    boolean checkIsRoomJoinable(String inviteCode);

    boolean checkIsRoomPlaying(String inviteCode);


    void startQuizroom(String sessionId);

    EndQuizDto.Response endQuizgame(String sessionId, EndQuizDto.Request request);

    void exitQuizroom(ExitQuizDto.Request req);

    void joinQuizroom(String sessionId, long userId);

    List<PlayerDto.Response> getPlayers(String sessionId);
}
