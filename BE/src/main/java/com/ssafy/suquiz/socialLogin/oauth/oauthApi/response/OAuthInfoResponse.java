package com.ssafy.suquiz.socialLogin.oauth.oauthApi.response;


import com.ssafy.suquiz.user.domain.OAuthProvider;

public interface OAuthInfoResponse {
    String getEmail();
//    String getNickname();
    OAuthProvider getOAuthProvider();
//    String getAccessToken();
//    String getRefreshToken();
}
