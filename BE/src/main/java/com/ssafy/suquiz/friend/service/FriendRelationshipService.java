package com.ssafy.suquiz.friend.service;

import com.ssafy.suquiz.friend.dto.FriendDto;

import java.util.List;

public interface FriendRelationshipService {
    FriendDto.Response searchUser(String nickname);

    List<FriendDto.Response> getFriendList(long userId);

    void requestFriend(FriendDto.Request req);

    List<FriendDto.Response> getRequestList(long userId);

    void acceptFriend(FriendDto.Request req);

    void removeFriend(FriendDto.Request req);
}
