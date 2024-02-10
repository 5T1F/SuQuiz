package com.example.entity.multiplay.serviceImpl;

import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class OpenViduService {

    private final OpenVidu openVidu;
    private String id;

    public OpenViduService(@Value("${OPENVIDU_URL}") String openViduUrl,
                           @Value("${OPENVIDU_SECRET}") String openViduSecret) {
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
    }

    public Map<String, String> createSessionWithToken() throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = this.openVidu.createSession();
        String sessionId = session.getSessionId();
        // 고유 초대 코드 생성
        String inviteCode = UUID.randomUUID().toString();
        // 초대 코드와 세션 ID 매핑 저장
        id = sessionId;
        // 세션에 대한 토큰 생성
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data("user_data") // 사용자 정의 데이터
                .build();
        String token = session.createConnection(connectionProperties).getToken();

        // 초대 코드, 세션 ID, 토큰을 Map에 담아 반환
        Map<String, String> result = new HashMap<>();
        result.put("inviteCode", inviteCode);
        result.put("sessionId", sessionId);
        result.put("token", token);

        return result;
    }

    public String getSessionIdByInviteCode(String inviteCode) {
        // 초대 코드로 세션 ID 조회
        System.out.println("꺼냄");
        return id;
    }

    public String generateToken(String sessionId) throws Exception {
        // 세션에 대한 토큰 생성
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data("user_data") // 사용자 정의 데이터
                .build();
        return this.openVidu.getActiveSession(sessionId).createConnection(connectionProperties).getToken();
    }
}
