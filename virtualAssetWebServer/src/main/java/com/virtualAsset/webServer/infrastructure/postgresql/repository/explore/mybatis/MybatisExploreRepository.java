package com.virtualAsset.webServer.infrastructure.postgresql.repository.explore.mybatis;

import com.virtualAsset.webServer.infrastructure.postgresql.entity.community.CommunityBannerEntity;
import com.virtualAsset.webServer.infrastructure.postgresql.repository.explore.ExploreRepository;
import com.virtualAsset.webServer.application.service.explore.CommunitySearchCond;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisExploreRepository implements ExploreRepository {

    private final ExploreMapper exploreMapper;

    @Override
    public List<CommunityBannerEntity> findAll(CommunitySearchCond cond) {
        List<CommunityBannerEntity> result = exploreMapper.findAll(cond);
        log.info("Find in DB = " + result);
        return result;
    }
}
