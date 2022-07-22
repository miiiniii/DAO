package com.virtualAsset.webServer.dataAccessObject;

import java.util.List;

import com.virtualAsset.webServer.entity.ChannelEntity;
import com.virtualAsset.webServer.entity.ChannelTabEntity;
import com.virtualAsset.webServer.entity.CommunityBannerEntity;

public interface CommunityDAO {
	public List<CommunityBannerEntity> selectAllBanners();
	public List<CommunityBannerEntity> selectMyBanners(String id);
	public int enterCommunity(int communityId, String userId);
	public List<ChannelEntity> getChannels(int communityId);
	public List<ChannelTabEntity> getChannelTabs(int communityId);
}
