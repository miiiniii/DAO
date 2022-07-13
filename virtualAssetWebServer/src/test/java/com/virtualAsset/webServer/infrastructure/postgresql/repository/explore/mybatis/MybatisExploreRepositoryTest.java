package com.virtualAsset.webServer.infrastructure.postgresql.repository.explore.mybatis;


import com.virtualAsset.webServer.infrastructure.postgresql.entity.community.CommunityBannerEntity;
import com.virtualAsset.webServer.application.service.explore.CommunitySearchCond;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@Slf4j
@SpringBootTest
class MybatisExploreRepositoryTest {

    @Autowired
    MybatisExploreRepository communityRepository;




    @Test
    void findAll(){


        CommunitySearchCond cond1 = CommunitySearchCond.builder()
                .name("투")
                .build();
        CommunitySearchCond cond2 = CommunitySearchCond.builder()
                .name("유찾모")
                .build();

        List<CommunityBannerEntity> result = communityRepository.findAll(cond1);
        System.out.println("result = " + result);


    }



}