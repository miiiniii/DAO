package com.virtualAsset.webServer.application.service.explore;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
class ExploreServiceTest {

    @Autowired
    private ExploreService exploreService;

    @Test
    void searchTest() {
        CommunitySearchCond query = CommunitySearchCond.builder()
                .filterType("tags")
                .text("부동산")
                .build();
        List<ExploreReadUseCase.FindCommunityBannerResult> communityAllWithFilter = exploreService.getCommunityAllWithFilter(query);

        System.out.println("communityAllWithTags = " + communityAllWithFilter);


    }
}