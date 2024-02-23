package com.ssafy.suquiz;

import com.ssafy.suquiz.socialLogin.oauth.util.JwtProperties;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@OpenAPIDefinition(
		servers = {
				@Server(url = "https://suquiz.shop/api", description = "Suquiz Shop Server"),
				@Server(url = "http://i10b302.p.ssafy.io/api", description = "Another Server"),
				@Server(url = "http://localhost:5000/api", description = "Develop Server")
		}
)

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties(JwtProperties.class)
public class SuQuizApplication {

	public static void main(String[] args) {
		SpringApplication.run(SuQuizApplication.class, args);

	}

}
