package com.ssafy.suquiz.friend.repository;

import com.ssafy.suquiz.friend.domain.FriendRelationship;
import com.ssafy.suquiz.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRelationshipRepository extends JpaRepository<FriendRelationship, Long> {

    @Query("SELECT f.toUser FROM FriendRelationship f WHERE f.fromUser.id = :userId AND f.isFriend = true AND EXISTS (SELECT 1 FROM FriendRelationship f2 WHERE f2.fromUser.id = f.toUser.id AND f2.toUser.id = :userId AND f2.isFriend = true) ORDER BY f.toUser.nickname ASC")
    List<User> findAllFriendsById(@Param("userId") long userId);


    @Query("SELECT f.toUser FROM FriendRelationship f WHERE f.fromUser.id = :userId AND f.isFriend = false ORDER BY f.toUser.nickname ASC")
    List<User> findAllRequestById(@Param("userId") long userId);

    @Query("SELECT f FROM FriendRelationship f WHERE f.fromUser.nickname like :fromNickname AND f.toUser.nickname like :toNickname")
    FriendRelationship findByFromUserAndToUser(@Param("fromNickname") String fromNickname, @Param("toNickname") String toNickname);


    @Modifying
    @Query("DELETE FROM FriendRelationship f WHERE f.fromUser.nickname = :fromNickname AND f.toUser.nickname = :toNickname")
    void deleteByNicknames(@Param("fromNickname") String fromNickname, @Param("toNickname") String toNickname);
}
