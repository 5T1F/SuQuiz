package com.ssafy.suquiz.bookmark.service;

import com.ssafy.suquiz.bookmark.dto.BookmarkDTO;

public interface BookmarkService {

    BookmarkDTO.checkResponse findAllByUserId(long userid);
    void addWordsByUser(Long userId, String wordName);
    void deleteWordsByUser(Long email, String wordName);
}
