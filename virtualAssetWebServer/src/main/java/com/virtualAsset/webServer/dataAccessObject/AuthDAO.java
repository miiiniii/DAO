package com.virtualAsset.webServer.dataAccessObject;

import com.virtualAsset.webServer.entity.AuthEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthDAO {
	
	public String getPassword(String id);
	
	public AuthEntity getUserInfo(String id);
}
