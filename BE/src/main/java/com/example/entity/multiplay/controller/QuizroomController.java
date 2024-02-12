package com.example.entity.multiplay.controller;

import com.example.entity.education.dto.WordDTO;
import com.example.entity.global.dto.CommonResponse;
import com.example.entity.multiplay.dto.EndQuizDto;
import com.example.entity.multiplay.dto.ExitQuizDto;
import com.example.entity.multiplay.dto.PlayerDto;
import com.example.entity.multiplay.service.QuizroomService;
import com.example.entity.ranking.dto.RankingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quizrooms")
public class QuizroomController {
    private final QuizroomService quizroomService;

    // 퀴즈 룸 입장 가능 여부 조회
    @GetMapping("/isJoinable/{inviteCode}")
    public ResponseEntity<CommonResponse> checkIsRoomJoinable(@PathVariable String inviteCode) {
        boolean isJoinable = quizroomService.checkIsRoomJoinable(inviteCode);

        if(isJoinable) {
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("퀴즈룸 입장 가능")
                    .data("true")
                    .build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("퀴즈룸 입장 불가")
                    .data("false")
                    .build(), HttpStatus.OK);
        }

    }


    // 퀴즈 룸 퇴장
    @PutMapping("/exit")
    public ResponseEntity<CommonResponse> exitQuizroom(@RequestBody ExitQuizDto.Request req) {
        quizroomService.exitQuizroom(req);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("퀴즈룸 퇴장 완료")
                .data("")
                .build(), HttpStatus.OK);
    }

    // 퀴즈 룸 게임 진행 여부 조회
    @GetMapping("/isPlaying/{inviteCode}")
    public ResponseEntity<CommonResponse> checkQuizroomIsPlaying(@PathVariable String inviteCode) {
        boolean isPlaying = quizroomService.checkIsRoomPlaying(inviteCode);
        if(isPlaying) {
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("게임 진행중")
                    .data("true")
                    .build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("게임 대기중")
                    .data("false")
                    .build(), HttpStatus.OK);
        }
    }

//    // 퀴즈 룸 시작, 단어 리스트 요청
//    @PostMapping("/start/{sessionId}")
//    public ResponseEntity<CommonResponse> startQuizroom(@PathVariable String sessionId) {
//        List<WordDTO.WordResponseDto> wordList = quizroomService.startQuizroom(sessionId);
//        return new ResponseEntity<>(CommonResponse.builder()
//                .status(HttpStatus.OK.value())
//                .message("퀴즈룸 단어리스트 응답 성공")
//                .data(wordList)
//                .build(), HttpStatus.OK);
//    }

    // 퀴즈룸 참가자 정보 요청
    @GetMapping("/players/{sessionId}")
    public ResponseEntity<CommonResponse> getPlayers(@PathVariable String sessionId) {
        List<PlayerDto.Response> playerList = quizroomService.getPlayers(sessionId);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("퀴즈룸 참가자 응답 성공")
                .data(playerList)
                .build(), HttpStatus.OK);
    }


    // 퀴즈 룸 멀티게임 종료

    @PutMapping("/end/{sessionId}")
    public ResponseEntity<CommonResponse> endQuizgame(@PathVariable String sessionId, @RequestBody List<EndQuizDto.Request> requests) {
        List<EndQuizDto.Response> resultList = quizroomService.endQuizgame(sessionId, requests);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("퀴즈게임 종료")
                .data(resultList)
                .build(), HttpStatus.OK);
    }







}
