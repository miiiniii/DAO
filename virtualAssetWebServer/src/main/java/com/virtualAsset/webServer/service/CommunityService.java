/**
 * 
 */
package com.virtualAsset.webServer.service;

import java.util.List;


import org.springframework.stereotype.Service;

import com.virtualAsset.webServer.dataAccessObject.CommunityBannerDAO;
import com.virtualAsset.webServer.entity.CommunityBannerEntity;

import lombok.RequiredArgsConstructor;

/**
 * @author tt040
 *
 */
@Service
@RequiredArgsConstructor
public class CommunityService{

	private CommunityBannerDAO communityBannerDAO;
	
	public CommunityService(CommunityBannerDAO communityBannerDAO) {
		this.communityBannerDAO =communityBannerDAO;
	}
	
	public List<CommunityBannerEntity> getAllBanners() {
		return communityBannerDAO.selectAllBanners();
	}
	
}
