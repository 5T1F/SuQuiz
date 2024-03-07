package com.ssafy.suquiz.multiplay.serviceImpl;

import com.ssafy.suquiz.multiplay.domain.Quizroom;
import com.ssafy.suquiz.multiplay.repository.QuizroomRepository;
import com.ssafy.suquiz.multiplay.service.QuizroomService;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class SessionService {

    private final OpenVidu openVidu;

    private final QuizroomService quizroomService;

    private final QuizroomRepository quizroomRepository;

    private final UserRepository userRepository;


    public SessionService(@Value("${OPENVIDU_URL}") String openViduUrl,
                          @Value("${OPENVIDU_SECRET}") String openViduSecret, QuizroomService quizroomService, QuizroomRepository quizroomRepository, UserRepository userRepository) {
        this.quizroomRepository = quizroomRepository;
        this.userRepository = userRepository;
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
        this.quizroomService = quizroomService;
    }

    public Map<String, String> createSessionWithToken(long userId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = this.openVidu.createSession();
        String sessionId = session.getSessionId();
        // 고유 초대 코드 생성
        String inviteCode = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        // 초대 코드와 세션 ID 매핑 저장
        quizroomService.makeQuizroom(userId, sessionId, inviteCode);
        // 세션에 대한 토큰 생성
        User user = userRepository.findById(userId).get();
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data(user.getNickname()) // 사용자 정의 데이터
                .build();
        String token = session.createConnection(connectionProperties).getToken();

        // 초대 코드, 세션 ID, 토큰을 Map에 담아 반환
        Map<String, String> result = new HashMap<>();
        result.put("inviteCode", inviteCode);
        result.put("sessionId", sessionId);
        result.put("token", token);

        return result;
    }

    // 초대 코드로 세션 ID 조회
    public String getSessionIdByInviteCode(String inviteCode) {
        Optional<Quizroom> quizroom = quizroomRepository.findByInviteCode(inviteCode);
        if (quizroom.isPresent()) {
            return quizroom.get().getSessionId();
        } else {
            return null;
        }


    }

    public String generateToken(String sessionId, long userId) throws Exception {
        User user = userRepository.findById(userId).get();
        // 세션에 대한 토큰 생성
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data(user.getNickname()) // 사용자 정의 데이터
                .build();
        return this.openVidu.getActiveSession(sessionId).createConnection(connectionProperties).getToken();
    }
}
