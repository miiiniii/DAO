package com.virtualAsset.webServer.infrastructure.postgresql.repository.explore;

import com.virtualAsset.webServer.application.service.explore.CommunitySearchCond;
import com.virtualAsset.webServer.infrastructure.postgresql.entity.community.CommunityBannerEntity;

import java.util.List;

public interface ExploreRepository {


    List<CommunityBannerEntity> findAll(CommunitySearchCond cond);
}
