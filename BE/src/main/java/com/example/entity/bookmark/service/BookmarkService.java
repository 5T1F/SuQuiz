package com.example.entity.bookmark.service;

import com.example.entity.bookmark.dto.BookmarkDTO;

public interface BookmarkService {

    BookmarkDTO.checkResponse findAllByUser(Long userId);
    BookmarkDTO.checkResponse findAllByUserId(long userid);
    void addWordsByUser(Long userId, String wordName);
    void deleteWordsByUser(Long email, String wordName);
}
