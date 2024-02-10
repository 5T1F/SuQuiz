package com.example.entity.multiplay.controller;

import com.example.entity.multiplay.serviceImpl.OpenViduService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SessionController {

    @Autowired
    private OpenViduService openViduService;

    @PostMapping("/sessions")
    public ResponseEntity<?> createSession() {
        try {
            Map<String, String> sessionInfo = openViduService.createSessionWithToken();
            return ResponseEntity.ok(sessionInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating session: " + e.getMessage());
        }
    }

    @PostMapping("/sessions/{codeValue}/token")
    public ResponseEntity<?> generateToken(@PathVariable(name="codeValue") String inviteCode) {
        System.out.println("입장 요청");
        try {
            System.out.println(inviteCode);
            String sessionId = openViduService.getSessionIdByInviteCode(inviteCode);
            System.out.println(sessionId);
            String token = openViduService.generateToken(sessionId);
            System.out.println(token);
            return ResponseEntity.ok(Map.of("sessionId", sessionId, "token", token));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error generating token: " + e.getMessage());
        }
    }
}
