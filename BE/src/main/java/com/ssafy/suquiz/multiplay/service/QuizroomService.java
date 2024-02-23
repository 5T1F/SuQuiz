package com.ssafy.suquiz.multiplay.service;

import com.ssafy.suquiz.multiplay.dto.EndQuizDto;
import com.ssafy.suquiz.multiplay.dto.ExitQuizDto;
import com.ssafy.suquiz.multiplay.dto.PlayerDto;
import com.ssafy.suquiz.singleplay.dto.QuestDto;

import java.util.List;


public interface QuizroomService {
    void makeQuizroom(Long userId, String sessionId, String inviteCode);

    boolean checkIsRoomJoinable(String inviteCode);

    boolean checkIsRoomPlaying(String inviteCode);

    List<QuestDto.DailyListResponse> multiQuest();

    void startQuizroom(String sessionId);

    EndQuizDto.Response endQuizgame(String sessionId, EndQuizDto.Request request);

    void exitQuizroom(ExitQuizDto.Request req);

    void joinQuizroom(String sessionId, long userId);

    List<PlayerDto.Response> getPlayers(String sessionId);
}
