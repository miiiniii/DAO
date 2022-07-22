package com.virtualAsset.webServer.application.domain.community;


import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CommunityBanner {

    private Integer id;
    private String name;
    private Integer concludedContractAmount;
    private Integer totalContractAmount;
    private Integer memberAmount;
    private String introduce;
    private String tags;
    private Integer recentActivity;

}
