package com.ssafy.suquiz.friend.controller;


import com.ssafy.suquiz.friend.dto.FriendDto;
import com.ssafy.suquiz.friend.service.FriendRelationshipService;
import com.ssafy.suquiz.global.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/friends")
public class FriendController {

    private final FriendRelationshipService friendRelationshipService;


    // 친구 목록
    @GetMapping("/{userId}")
    ResponseEntity<CommonResponse> getFriendList(@PathVariable long userId) {
        List<FriendDto.Response> friendList = friendRelationshipService.getFriendList(userId);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("친구 목록 블러옴")
                .data(friendList)
                .build(), HttpStatus.OK);
    }

    // 친구 추가를 위한 유저 검색
    @GetMapping
    ResponseEntity<CommonResponse> searchUser(@RequestParam(name = "search") String nickname) {
        FriendDto.Response user = friendRelationshipService.searchUser(nickname);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("닉네임으로 유저 검색")
                .data(user)
                .build(), HttpStatus.OK);
    }

    // 친구 요청 전송
    @PostMapping("/request")
    ResponseEntity<CommonResponse> requestFriend(@RequestBody FriendDto.Request req) {
        friendRelationshipService.requestFriend(req);
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("친구 요청 성공")
                .data("")
                .build(), HttpStatus.OK);
    }

    // 친구 요청 조회
    @GetMapping("/request/{userId}")
    ResponseEntity<CommonResponse> getRequestList(@PathVariable long userId) {
        List<FriendDto.Response> requestList = friendRelationshipService.getRequestList(userId);
        return new ResponseEntity<>(com.ssafy.suquiz.global.dto.CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("친구 요청 조회 성공")
                .data(requestList)
                .build(), HttpStatus.OK);
    }

    // 친구 요청 수락
    @PostMapping("/accept")
    ResponseEntity<CommonResponse> acceptFriend(@RequestBody FriendDto.Request req) {
        friendRelationshipService.acceptFriend(req);
        return new ResponseEntity<>(com.ssafy.suquiz.global.dto.CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("친구 요청 수락")
                .data("")
                .build(), HttpStatus.OK);
    }

    // 친구 삭제
    @DeleteMapping("remove")
    ResponseEntity<CommonResponse> removeFriend(@RequestBody FriendDto.Request req) {
        friendRelationshipService.removeFriend(req);
        return new ResponseEntity<>(com.ssafy.suquiz.global.dto.CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("친구 제거 성공")
                .data("")
                .build(), HttpStatus.OK);
    }

}
