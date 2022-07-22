package com.virtualAsset.webServer.dataAccessObject;

import java.util.List;

import com.virtualAsset.webServer.entity.CommunityBannerEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityBannerDAO {
	public List<CommunityBannerEntity> selectAllBanners();
	public List<CommunityBannerEntity> selectMyBanners(String id);
}
