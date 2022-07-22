package com.virtualAsset.webServer.ui.view.community;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.virtualAsset.webServer.application.service.explore.ExploreReadUseCase;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommunityBannerView {

    private final Integer id;
    private final String name;
    private final Integer concludedContractAmount;
    private final Integer totalContractAmount;
    private final Integer memberAmount;
    private final String introduce;
    private final String tags;
    private final Integer recentActivity;

    public CommunityBannerView(ExploreReadUseCase.FindCommunityBannerResult result){
        this.id = result.getId();
        this.name = result.getName();
        this.concludedContractAmount = result.getConcludedContractAmount();
        this.totalContractAmount = result.getTotalContractAmount();
        this.memberAmount = result.getMemberAmount();
        this.introduce = result.getIntroduce();
        this.tags = result.getTags();
        this.recentActivity = result.getRecentActivity();
    }

}
