package com.ssafy.suquiz.socialLogin.oauth.service;

import com.ssafy.suquiz.socialLogin.oauth.oauthApi.client.RevokeTokenResponseDto;
import com.ssafy.suquiz.socialLogin.oauth.oauthApi.params.OAuthLogoutParams;
import com.ssafy.suquiz.socialLogin.oauth.oauthApi.response.RequestOAuthInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthLogoutService {

    private final RequestOAuthInfoService requestOAuthInfoService;

    public RevokeTokenResponseDto logout(OAuthLogoutParams params) {

        RevokeTokenResponseDto responseDto = requestOAuthInfoService.logoutService(params);

        return responseDto;
    }
}
