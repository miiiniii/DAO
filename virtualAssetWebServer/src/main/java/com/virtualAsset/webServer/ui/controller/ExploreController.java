package com.virtualAsset.webServer.ui.controller;


import com.virtualAsset.webServer.application.service.explore.CommunitySearchCond;
import com.virtualAsset.webServer.application.service.explore.ExploreReadUseCase;
import com.virtualAsset.webServer.application.service.explore.ExploreService;
import com.virtualAsset.webServer.ui.view.ApiResponseView;
import com.virtualAsset.webServer.ui.view.community.CommunityBannerView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExploreController {

    private final ExploreService exploreService;

    @GetMapping("/search")
    public ResponseEntity<ApiResponseView<List<CommunityBannerView>>> getCommunityBanner(@RequestParam(value = "text", required = false) String text,
                                                                                         @RequestParam(value = "filterType") String filterType){

        CommunitySearchCond query = CommunitySearchCond.builder()
                .text(text)
                .filterType(filterType)
                .build();

        List<ExploreReadUseCase.FindCommunityBannerResult> results = exploreService.getCommunityAllWithFilter(query);

        List<CommunityBannerView> views = results.stream().map(CommunityBannerView::new).collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponseView<>(views));


    }
}
