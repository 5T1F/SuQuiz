package com.ssafy.suquiz.socialLogin.oauth.oauthApi.params;

import com.ssafy.suquiz.user.domain.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLogoutParams {

    OAuthProvider oAuthProvider();

    MultiValueMap<String, String> makebody();

}
