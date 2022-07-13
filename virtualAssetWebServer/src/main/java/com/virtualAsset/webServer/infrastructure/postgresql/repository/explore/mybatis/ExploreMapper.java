package com.virtualAsset.webServer.infrastructure.postgresql.repository.explore.mybatis;

import com.virtualAsset.webServer.infrastructure.postgresql.entity.community.CommunityBannerEntity;
import com.virtualAsset.webServer.application.service.explore.CommunitySearchCond;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ExploreMapper {

    List<CommunityBannerEntity> findAll(CommunitySearchCond communitySearch);
}
