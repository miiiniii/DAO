package com.virtualAsset.webServer.responseBody;


import com.virtualAsset.webServer.commons.StatusCodes;
import com.virtualAsset.webServer.entity.AuthEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class AuthValResponseBody extends DefaultResponseBody{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	AuthEntity userInfo;
	public AuthValResponseBody(StatusCodes statusCodes, AuthEntity authEntity) {
		super(statusCodes);
		this.userInfo=authEntity;
	}
	

	
}
