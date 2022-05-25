package com.virtualAsset.webServer.data;

/**
 * 사용자 계정 데이터 모델
 * <pre>
 *<b>History:<b/>
 *     안성찬, 1.0, 2022.5.13 작성
 * @author 안성찬
 * @version 1.0, 2022.5.13
 * @see ErrorCode
 */
public class Auth {
	private String id;
	private String name;
	private String connectIP;
	private ErrorCode errorCode = ErrorCode.NULL_SESSION;
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getIP() {
		return connectIP;
	}
	/**
	 * @return errorCode.code
	 * @see ErrorCode
	 */
	public int getCode() {
		return this.errorCode.code;
	}
	/**
	 * @return errorCode.name
	 * @see ErrorCode
	 */ 
	public String getMessage() {
		return this.errorCode.name();
	}
	/**
	 * 계정 정보 조회 성공시 생성자
	 * @param id 사용자 id
	 * @param name 사용자 이름
	 * @param ip 접속 ip
	 */
	public Auth(String id, String name, String ip) {
		this.id = id;
		this.name = name;
		this.connectIP = ip;
		this.errorCode = ErrorCode.AUTH_SUCCESS;
	}
	/**
	 * 계정 정보 조회 실패시 생성자
	 * @param errorCode 실패 에러 코드
	 */
	public Auth(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

	/**
	 * <pre>
	 * 사용자 계정 데이터 에러 코드
	 * 
	 * NULL_SESSION:	0
	 * AUTH_SUCCESS:	100
	 * SESSION_OVERLAP:	1212
	 * SESSION_EXPIRE:	1211
	 * FAIL_AUTHENTICATION:	1111
	 * 
	 *<b>History:<b/>
	 *     안성찬, 1.0, 2022.5.13 작성
	 * @author 안성찬
	 * @version 1.0, 2022.5.13
	 * @see Auth
	 */
	public static enum ErrorCode {
		NULL_SESSION(0),
		AUTH_SUCCESS(100),
		SESSION_OVERLAP(1212),
		SESSION_EXPIRE(1211),
		FAIL_AUTHENTICATION(1111);

		private final int code;
		
		ErrorCode(int code) {
			this.code = code;
		}

		public int getCode() {
			return code;
		}
	}
}
