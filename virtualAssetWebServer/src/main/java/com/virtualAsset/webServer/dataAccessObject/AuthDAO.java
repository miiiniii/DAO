package com.virtualAsset.webServer.dataAccessObject;

import com.virtualAsset.webServer.entity.AuthEntity;

public interface AuthDAO {
	
	public String getPassword(String id);
	
	public AuthEntity getUserInfo(String id);
}
