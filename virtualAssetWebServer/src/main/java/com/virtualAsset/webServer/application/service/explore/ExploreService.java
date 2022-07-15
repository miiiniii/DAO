package com.virtualAsset.webServer.application.service.explore;



import com.virtualAsset.webServer.application.domain.community.CommunityBanner;
import com.virtualAsset.webServer.infrastructure.postgresql.entity.community.CommunityBannerEntity;
import com.virtualAsset.webServer.infrastructure.postgresql.repository.explore.ExploreRepository;
import com.virtualAsset.webServer.infrastructure.postgresql.repository.explore.mybatis.MybatisExploreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExploreService implements ExploreReadUseCase {

    private final MybatisExploreRepository exploreRepository;

    @Override
    public List<FindCommunityBannerResult> getCommunityAllWithFilter(CommunitySearchCond query) {

        List<CommunityBannerEntity> communityBannerEntities = exploreRepository.findAll(query);

        List<CommunityBanner> communityBanners = communityBannerEntities.stream()
                .map(CommunityBannerEntity::toCommunityBanner).toList();


        // TODO: 2022/07/13 예외처리 추후 추가
        return communityBanners.stream()
                .map(FindCommunityBannerResult::findByCommunityBanner)
                .collect(Collectors.toList());


    }
}
