package com.virtualAsset.webServer.dataAccessObject;

import java.util.List;

import com.virtualAsset.webServer.entity.CommunityBannerEntity;

public interface CommunityBannerDAO {
	public List<CommunityBannerEntity> selectAllBanners();
	public List<CommunityBannerEntity> selectMyBanners(String id);
}
