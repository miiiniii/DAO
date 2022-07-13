package com.virtualAsset.webServer.application.service.explore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommunitySearchCond {


    private final String name;
    private final String tags;
    private final String introduce;

}
