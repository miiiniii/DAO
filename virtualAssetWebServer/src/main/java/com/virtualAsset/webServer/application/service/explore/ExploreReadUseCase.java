package com.virtualAsset.webServer.application.service.explore;

import com.virtualAsset.webServer.application.domain.community.CommunityBanner;
import lombok.*;

import java.util.List;

public interface ExploreReadUseCase {
    List<FindCommunityBannerResult> getCommunityAllWithFilter(CommunitySearchCond query);


    @Getter
    @Builder
    @ToString
    @EqualsAndHashCode
    class FindCommunityBannerResult {
        private final Integer id;
        private final String name;
        private final Integer concludedContractAmount;
        private final Integer totalContractAmount;
        private final Integer memberAmount;
        private final String introduce;
        private final String tags;
        private final Integer recentActivity;

        public static FindCommunityBannerResult findByCommunityBanner(CommunityBanner communityBanner){
            return FindCommunityBannerResult.builder()
                    .id(communityBanner.getId())
                    .name(communityBanner.getName())
                    .concludedContractAmount(communityBanner.getConcludedContractAmount())
                    .totalContractAmount(communityBanner.getTotalContractAmount())
                    .memberAmount(communityBanner.getMemberAmount())
                    .introduce(communityBanner.getIntroduce())
                    .tags(communityBanner.getTags())
                    .recentActivity(communityBanner.getRecentActivity())
                    .build();
        }

    }
}
