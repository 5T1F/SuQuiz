package com.ssafy.suquiz.socialLogin.oauth.util;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    String secretKey;

}
