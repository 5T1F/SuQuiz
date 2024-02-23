package com.ssafy.suquiz.multiplay.controller;

import com.ssafy.suquiz.multiplay.service.QuizroomService;
import com.ssafy.suquiz.multiplay.serviceImpl.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private QuizroomService quizroomService;


    //세션 생성하기
    @PostMapping("/sessions/{userId}")
    public ResponseEntity<?> createSession(@PathVariable(name = "userId") Long userId) {
        try {
            Map<String, String> sessionInfo = sessionService.createSessionWithToken(userId);
            return ResponseEntity.ok(sessionInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating session: " + e.getMessage());
        }
    }

    //세션 참가하기
    @PostMapping("/sessions/{codeValue}/token/{userId}")
    public ResponseEntity<?> generateToken(@PathVariable(name = "codeValue") String inviteCode, @PathVariable(name = "userId") long userId) {
        try {
            String sessionId = sessionService.getSessionIdByInviteCode(inviteCode);
            String token = sessionService.generateToken(sessionId, userId);
            quizroomService.joinQuizroom(sessionId, userId);
            return ResponseEntity.ok(Map.of("sessionId", sessionId, "token", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error generating token: " + e.getMessage());
        }
    }
}
