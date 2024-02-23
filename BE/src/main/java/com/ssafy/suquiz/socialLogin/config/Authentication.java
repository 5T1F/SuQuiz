package com.ssafy.suquiz.socialLogin.config;

public record Authentication(
        long userId
) {

    public static Authentication createEmptyAuthentication() {
        return new Authentication(-1L);
    }

}
