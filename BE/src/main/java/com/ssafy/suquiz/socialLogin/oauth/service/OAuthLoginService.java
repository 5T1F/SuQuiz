package com.ssafy.suquiz.socialLogin.oauth.service;

import com.ssafy.suquiz.socialLogin.oauth.oauthApi.params.OAuthLoginParams;
import com.ssafy.suquiz.socialLogin.oauth.oauthApi.response.OAuthInfoResponse;
import com.ssafy.suquiz.socialLogin.oauth.oauthApi.response.RequestOAuthInfoService;
import com.ssafy.suquiz.socialLogin.oauth.tokens.AuthTokens;
import com.ssafy.suquiz.socialLogin.oauth.tokens.AuthTokensGenerator;
import com.ssafy.suquiz.user.domain.OAuthProvider;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {
    private final UserRepository userRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

//    public AuthTokens login(OAuthLoginParams params) {
//        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
//        // param 값을 통한, access, refresh, grantType, 유효시간을 반환한다.
//        Long memberId = findOrCreateMember(oAuthInfoResponse);
//
//        return authTokensGenerator.generate(memberId);
//        // JWT 토큰으로 엑세스 토큰, 리프래쉬 토큰이 만들어져서 리턴된다
//    }

    public LoginResult login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        OAuthProvider oAuthProvider = oAuthInfoResponse.getOAuthProvider();
        String email = oAuthInfoResponse.getEmail();
        Long userId = findOrCreateMember(oAuthInfoResponse);
        Optional<User> findUser = userRepository.findById(userId);
        String nickname = findUser.get().getNickname();
        AuthTokens authTokens = authTokensGenerator.generate(userId);

        return new LoginResult(userId, oAuthProvider, nickname, email, authTokens);
    }

    private Long findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        User user = userRepository.findByEmailAndOAuthProvider(
                oAuthInfoResponse.getEmail(),
                oAuthInfoResponse.getOAuthProvider()
        );

        if (user != null) {
            return user.getId();
        } else {
            return newMember(oAuthInfoResponse);
        }
    }

    private Long newMember(OAuthInfoResponse oAuthInfoResponse) {
        User user = User.builder()
                .email(oAuthInfoResponse.getEmail())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        return userRepository.save(user).getId();
    }

//    public Boolean findNickname(String email) {
//        Optional<User> findUser = userRepository.findByEmail(email);
//        String nickname = findUser.get().getNickname();
//        if(nickname == null) {
//            return false;
//        } else
//            return true;
//    }

    public NicknameResponse findEmailAndProvider(String email, String provider) {
        String nickname = null;
        if(OAuthProvider.KAKAO.name().equalsIgnoreCase(provider)) {
            User findUser = userRepository.findByEmailAndOAuthProvider(email, OAuthProvider.KAKAO);
            nickname = findUser.getNickname();
        } else if(OAuthProvider.NAVER.name().equalsIgnoreCase(provider)) {
            User findUser = userRepository.findByEmailAndOAuthProvider(email, OAuthProvider.NAVER);
            nickname = findUser.getNickname();
        }
        return new NicknameResponse(nickname);
    }

    public boolean findNicknameAndProvider(String email, String provider) {
        if (OAuthProvider.KAKAO.name().equalsIgnoreCase(provider)) {
            return checkNickname(email, OAuthProvider.KAKAO);
        } else if (OAuthProvider.NAVER.name().equalsIgnoreCase(provider)) {
            return checkNickname(email, OAuthProvider.NAVER);
        }
        return false;
    }

    private boolean checkNickname(String email, OAuthProvider provider) {
        User findUser = userRepository.findByEmailAndOAuthProvider(email, provider);
        if(findUser == null) {
            return false;
        }
        String nickname = findUser.getNickname();
        return nickname != null;
    }

//    public NicknameResponse selectUser(String email) {
//        Optional<User> findEmail = userRepository.findByEmail(email);
//        String nickname = findEmail.get().getNickname();
//        return new NicknameResponse(nickname);
//    }

    public boolean findAllNickname(String nickname) {
        Optional<User> findNickname = userRepository.findByNickname(nickname);
        // 닉네임을 가진 유저가 있으면 false, 없으면 true
        if (findNickname.isPresent())
            return false;
        else
            return true;

    }

    @Transactional
    public Boolean registerNickname(nicknameRequest request) {
        OAuthProvider provider;

        try {
            provider = OAuthProvider.valueOf(request.getProvider().toUpperCase());
        } catch (IllegalArgumentException e) {
            return false; // 잘못된 provider 값인 경우
        }

        User user = userRepository.findByEmailAndOAuthProvider(request.getEmail(), provider);

        if (user == null) {
            return false; // 사용자를 찾을 수 없는 경우
        }

        user.changeNickname(request.getNickname());
        return true;
    }

    private User findUser(OAuthInfoResponse oAuthInfoResponse) {
        Optional<User> findUser = userRepository.findByEmail(oAuthInfoResponse.getEmail());

        return findUser.orElse(null);
    }

    @Data
    @AllArgsConstructor
    public static class LoginResult {
        private final Long userId;
        private final OAuthProvider oAuthProvider;
        private final String nickname;
        private final String email;
        private final AuthTokens authTokens;
    }

    @Data
    @AllArgsConstructor
    public static class nicknameRequest {
        private final String email;
        private final String provider;
        private final String nickname;
    }

    @Data
    @AllArgsConstructor
    public static class NicknameResponse {
        private final String nickname;
    }

}
