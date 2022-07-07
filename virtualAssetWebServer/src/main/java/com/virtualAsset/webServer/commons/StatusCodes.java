package com.virtualAsset.webServer.commons;

public enum StatusCodes {
	CLASS_TO_JSON_FAIL(2000),
	FAIL_ACCESS_DB(505),
	AUTH_SUCCESS(1000),
	SESSION_OVERLAP(1212),
	SESSION_EXPIRE(1211),
	FAIL_AUTHENTICATION(1111);

	private final int code;
	
	StatusCodes(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}
}
