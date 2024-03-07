package com.ssafy.suquiz.friend.serviceImpl;

import com.ssafy.suquiz.friend.domain.FriendRelationship;
import com.ssafy.suquiz.friend.dto.FriendDto;
import com.ssafy.suquiz.friend.repository.FriendRelationshipRepository;
import com.ssafy.suquiz.friend.service.FriendRelationshipService;
import com.ssafy.suquiz.global.service.EntityAndDtoConversionService;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendRelationshipServiceImpl implements FriendRelationshipService {

    private final FriendRelationshipRepository friendRelationshipRepository;
    private final EntityAndDtoConversionService entityAndDtoConversionService;
    private final UserRepository userRepository;

    @Override
    public FriendDto.Response searchUser(String nickname) {
        Optional<User> optionalUser = userRepository.findByNickname(nickname);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return entityAndDtoConversionService.userEntityToFriendDtoResponse(user);
        }
        return null;


    }

    @Override
    public List<FriendDto.Response> getFriendList(long userId) {
        List<User> friendEntityList = friendRelationshipRepository.findAllFriendsById(userId);
        List<FriendDto.Response> friendList = new ArrayList<>();
        for (User user : friendEntityList) {
            friendList.add(entityAndDtoConversionService.userEntityToFriendDtoResponse(user));
        }

        return friendList;
    }

    @Override
    public void requestFriend(FriendDto.Request req) {
        User fromUser = userRepository.findByNickname(req.getFromNickname()).get();
        User toUser = userRepository.findByNickname(req.getToNickname()).get();
        FriendRelationship friendRequest = FriendRelationship.builder().fromUser(fromUser).toUser(toUser).build();
        if (!friendRequest.isFriend())
            friendRequest.updateIsFriend();
        FriendRelationship friendAccept = FriendRelationship.builder().fromUser(toUser).toUser(fromUser).build();

        friendRelationshipRepository.save(friendRequest);
        friendRelationshipRepository.save(friendAccept);
    }

    @Override
    public List<FriendDto.Response> getRequestList(long userId) {

        List<User> requestList = friendRelationshipRepository.findAllRequestById(userId);
        List<FriendDto.Response> resList = new ArrayList<>();
        for (User user : requestList) {
            resList.add(entityAndDtoConversionService.userEntityToFriendDtoResponse(user));
        }

        return resList;
    }

    @Override
    @Transactional
    public void acceptFriend(FriendDto.Request req) {
        FriendRelationship friendRelationship = friendRelationshipRepository.findByFromUserAndToUser(req.getFromNickname(), req.getToNickname());
        if (!friendRelationship.isFriend())
            friendRelationship.updateIsFriend();
    }

    @Override
    @Transactional
    public void removeFriend(FriendDto.Request req) {
        friendRelationshipRepository.deleteByNicknames(req.getFromNickname(), req.getToNickname());
        friendRelationshipRepository.deleteByNicknames(req.getToNickname(), req.getFromNickname());

    }

}
