package com.virtualAsset.webServer.data;

public class Auth {
	private String id;
	private String name;
	private String connectIP;
	private ErrorCode errorCode=ErrorCode.NULL_SESSION;
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getIP() {
		return connectIP;
	}
	public int getCode() {
		return this.errorCode.code;
	}
	public String getMessage() {
		return this.errorCode.name();
	}
	public Auth(String id, String name, String ip){
		this.id=id;
		this.name=name;
		this.connectIP=ip;
		this.errorCode=ErrorCode.AUTH_SUCCESS;
	}
	public Auth(ErrorCode errorCode) {
		this.errorCode=errorCode;
	}
	public static enum ErrorCode{
		NULL_SESSION(0),
		AUTH_SUCCESS(100),
		SESSION_OVERLAP(1212),
		SESSION_EXPIRE(1211),
		FAIL_AUTHENTICATION(1111);
		
		private final int code;
		ErrorCode(int code){this.code=code;}
		public int getCode() {return code;}
	}
}
