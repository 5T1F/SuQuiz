package com.ssafy.suquiz.ranking.service;

import com.ssafy.suquiz.ranking.dto.RankingDto;

public interface RankingService {
    RankingDto.Response getRanking(long userId);
}
