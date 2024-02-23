package com.ssafy.suquiz.socialLogin.oauth.controller;

import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ApiController {
    private final UserRepository userRepository;

    @GetMapping("/members")
    public ResponseEntity<List<User>> members() {
        List<User> result = userRepository.findAll();
        return ResponseEntity.ok().body(result);
    }
}
