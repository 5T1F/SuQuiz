//package com.example.entity.multiplay.controller;
//
//import com.example.entity.multiplay.serviceImpl.OpenViduService;
//import io.openvidu.java.client.OpenViduHttpException;
//import io.openvidu.java.client.OpenViduJavaClientException;
//import io.openvidu.java.client.Session;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//public class SessionController {
//    @Autowired
//    private OpenViduService openViduService;
//
//    @PostMapping("/sessions")
//    public ResponseEntity<?> createSession() throws OpenViduJavaClientException, OpenViduHttpException {
//        try {
//            Session session = openViduService.createSession();
//            String sessionId = session.getSessionId();
//            String token = openViduService.generateToken(sessionId);
//            return ResponseEntity.ok(Map.of("sessionId", sessionId, "token", token));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error creating session: " + e.getMessage());
//        }
//    }
//
//    @PostMapping("/sessions/{sessionId}/token")
//    public ResponseEntity<?> generateToken(@PathVariable String sessionId) {
//        try {
//            String token = openViduService.generateToken(sessionId);
//            return ResponseEntity.ok(Map.of("token", token));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error generating token: " + e.getMessage());
//        }
//    }
//}
