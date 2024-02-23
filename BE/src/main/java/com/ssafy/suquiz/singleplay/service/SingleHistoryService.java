package com.ssafy.suquiz.singleplay.service;

import java.util.*;
import com.ssafy.suquiz.singleplay.dto.QuestDto;
import com.ssafy.suquiz.singleplay.dto.SingleHistoryDto;
import org.springframework.scheduling.annotation.Scheduled;

public interface SingleHistoryService {
    // 데일리 문제 생성
    @Scheduled
    void createDaily();
  // 데일리 조회
    boolean dailyIsSolved(Long userId);
    // 데일리 문제
    QuestDto.DailyStringResponse dailyQuest();
    // 데일리 추가 문제
    QuestDto.DailyStringResponse additionalQuest();
    // 입력
    SingleHistoryDto.SaveResponse end(SingleHistoryDto.SaveRequest singleHistoryRequestDto);
    // SNS 오늘의 결과
    SingleHistoryDto.ShareResponse dailyShare(Long userId);
    // 싱글 플레이 전체 결과 조회
    SingleHistoryDto.AllResultResponse singlePlayAllResult(Long userId);
}
