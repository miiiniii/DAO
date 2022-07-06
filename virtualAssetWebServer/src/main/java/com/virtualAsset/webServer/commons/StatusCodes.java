package com.virtualAsset.webServer.commons;

public enum StatusCodes {
	NULL_SESSION(0),
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
