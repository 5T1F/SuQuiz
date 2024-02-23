package com.ssafy.suquiz.ranking.controller;

import com.ssafy.suquiz.global.dto.CommonResponse;
import com.ssafy.suquiz.ranking.dto.RankingDto;
import com.ssafy.suquiz.ranking.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse> getRanking(@PathVariable long userId) {
        RankingDto.Response response = rankingService.getRanking(userId);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("랭킹 반환 성공")
                .data(response)
                .build(), HttpStatus.OK);
    }
}
