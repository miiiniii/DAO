package com.virtualAsset.webServer.responseBody;

import com.virtualAsset.webServer.commons.StatusCodes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ErrorResponseBody extends DefaultResponseBody {

	private static final long serialVersionUID = 1L;
	private String errormsg;
	
	public ErrorResponseBody(StatusCodes statusCodes, String errorMsg) {
		super(statusCodes);
		this.errormsg=errorMsg;
	}
}
