package com.virtualAsset.webServer.jsonObject;


import com.virtualAsset.webServer.commons.StatusCodes;
import com.virtualAsset.webServer.entity.AuthEntity;


public class AuthValJSon extends DefaultJSonBody{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	AuthEntity userInfo;
	public AuthValJSon(StatusCodes statusCodes, AuthEntity authEntity) {
		super(statusCodes);
		this.userInfo=authEntity;
	}
	
	public AuthEntity getUserInfo() {
		return userInfo;
	}
	public void setUserInfo(AuthEntity userInfo) {
		this.userInfo = userInfo;
	}
	
}
