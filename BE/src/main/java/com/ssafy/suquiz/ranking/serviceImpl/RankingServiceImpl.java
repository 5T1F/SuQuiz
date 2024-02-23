package com.ssafy.suquiz.ranking.serviceImpl;

import com.ssafy.suquiz.global.service.EntityAndDtoConversionService;
import com.ssafy.suquiz.ranking.dto.RankingDto;
import com.ssafy.suquiz.ranking.service.RankingService;
import com.ssafy.suquiz.user.domain.User;
import com.ssafy.suquiz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final UserRepository userRepository;
    private final EntityAndDtoConversionService entityAndDtoConversionService;

    @Override
    public RankingDto.Response getRanking(long userId) {
        List<User> orderedUserList = userRepository.findAllOrderByExp();
        List<RankingDto.RankDto> ranking = new ArrayList<>();
        int myRank = 0;
        for(int i=0; i<orderedUserList.size(); i++) {
            if(i<10) {
                ranking.add(entityAndDtoConversionService.userEntityToRankDto(orderedUserList.get(i)));
            }
            if(orderedUserList.get(i).getId() == userId) {
                myRank = i+1;
                if(i>=10) break;
            }
        }

        return RankingDto.Response.builder()
                .myRank(myRank)
                .ranking(ranking)
                .build();

    }
}
