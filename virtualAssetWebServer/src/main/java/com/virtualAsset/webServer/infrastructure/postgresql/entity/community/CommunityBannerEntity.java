package com.virtualAsset.webServer.infrastructure.postgresql.entity.community;


import com.virtualAsset.webServer.application.domain.community.CommunityBanner;
import lombok.*;
import org.springframework.data.annotation.Id;
import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CommunityBannerEntity implements Serializable {

    @Id
    private Integer id;
    private String name;
    private Integer concludedContractAmount;
    private Integer totalContractAmount;
    private Integer memberAmount;
    private String introduce;
    private String tags;
    private Integer recentActivity;

    public CommunityBanner toCommunityBanner(){
        return CommunityBanner.builder()
                .id(this.id)
                .name(this.name)
                .concludedContractAmount(this.concludedContractAmount)
                .totalContractAmount(this.totalContractAmount)
                .memberAmount(this.memberAmount)
                .introduce(this.introduce)
                .tags(this.tags)
                .recentActivity(this.recentActivity)
                .build();
    }

    public CommunityBannerEntity(CommunityBanner communityBanner){
        this.id = communityBanner.getId();
        this.name = communityBanner.getName();
        this.concludedContractAmount = communityBanner.getConcludedContractAmount();
        this.totalContractAmount = communityBanner.getTotalContractAmount();
        this.memberAmount = communityBanner.getMemberAmount();
        this.introduce = communityBanner.getIntroduce();
        this.tags = communityBanner.getTags();
        this.recentActivity = communityBanner.getRecentActivity();
    }

}
