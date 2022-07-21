package com.virtualAsset.webServer.responseBody;

import java.io.Serializable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.commons.StatusCodes;

import lombok.Data;

@Data
public class DefaultResponseBody implements Serializable{
	private static final long serialVersionUID = 1L;
	private String status;
	private int code;
	private String statusMessage;
	public DefaultResponseBody(String status, int code, String statusMessage) {
		this.status=status;
		this.code=code;
		this.statusMessage=statusMessage;
	}
	public DefaultResponseBody(String status, int code) {
		this(status, code, status);
	}
	public DefaultResponseBody(StatusCodes statusCodes, String statusMessage) {
		this(statusCodes.name(), statusCodes.getCode(), statusMessage);
	}
	public DefaultResponseBody(StatusCodes statusCodes) {
		this(statusCodes, statusCodes.name());
	}
	
	public String toString() {
		ObjectMapper mapper=new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "{\"status\":\""
					+StatusCodes.CLASS_TO_JSON_FAIL.name()
					+"\",\"code\":"
					+StatusCodes.CLASS_TO_JSON_FAIL.getCode() 
					+"}";
		}
	}
}
