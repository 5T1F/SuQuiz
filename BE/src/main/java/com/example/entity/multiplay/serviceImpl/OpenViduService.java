//package com.example.entity.multiplay.serviceImpl;
//
//import io.openvidu.java.client.*;
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.UUID;
//
//@Service
//public class OpenViduService {
//    private OpenVidu openVidu;
//    private Map<String, String> inviteCodeToSessionIdMap = new HashMap<>();
//
//    @Value("${openvidu.url}")
//    private String openViduUrl;
//
//    @Value("${openvidu.secret}")
//    private String openViduSecret;
//
//    @PostConstruct
//    public void init() {
//        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
//    }
//    public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = this.openVidu.createSession();
//        String sessionId = session.getSessionId();
//        // 고유 초대 코드 생성
//        String inviteCode = UUID.randomUUID().toString();
//        // 초대 코드와 세션 ID 매핑 저장
//        inviteCodeToSessionIdMap.put(inviteCode, sessionId);
//        return inviteCode; // 초대 코드 반환
//    }
//
//    public String getSessionIdByInviteCode(String inviteCode) {
//        // 초대 코드로 세션 ID 조회
//        return inviteCodeToSessionIdMap.get(inviteCode);
//    }
////    }
//    public String generateToken(String sessionId) throws Exception {
//        Session session = this.openVidu.getActiveSession(sessionId);
//        if (session == null) {
//            session = this.openVidu.createSession();
//        }
//        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
//                .type(ConnectionType.WEBRTC)
//                .role(OpenViduRole.PUBLISHER)
//                .data("user_data") // 여기서 "user_data"는 사용자 정의 데이터입니다.
//                .build();
//        return session.createConnection(connectionProperties).getToken();
//    }
//
//
//}
