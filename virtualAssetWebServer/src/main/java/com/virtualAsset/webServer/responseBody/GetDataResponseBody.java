package com.virtualAsset.webServer.responseBody;


import com.virtualAsset.webServer.commons.StatusCodes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class GetDataResponseBody<T> extends DefaultResponseBody{
	private static final long serialVersionUID = 1L;
	private T data;
	
	public GetDataResponseBody(StatusCodes statusCodes, T data){
		super(statusCodes);
		this.data=data;
	}
	public GetDataResponseBody(StatusCodes statusCodes,String statusMessage, T data) {
		super(statusCodes, statusMessage);
		this.data=data;
	}
}
