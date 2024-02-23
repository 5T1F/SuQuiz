package com.ssafy.suquiz.config.dummy;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializationRunner implements ApplicationRunner {

    private final DummyDataService dummyDataService;

    public DataInitializationRunner(DummyDataService dummyDataService) {
        this.dummyDataService = dummyDataService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 애플리케이션 초기화 시점에 DummyDataService를 실행
        dummyDataService.insertDummyData();
    }
}
