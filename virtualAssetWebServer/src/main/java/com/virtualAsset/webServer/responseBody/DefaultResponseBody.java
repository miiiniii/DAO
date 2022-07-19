package com.virtualAsset.webServer.responseBody;

import java.io.Serializable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.commons.StatusCodes;

import lombok.Data;

@Data
public class DefaultResponseBody implements Serializable{
	private static final long serialVersionUID = 1L;
	String status;
	int code;
	public DefaultResponseBody(String status, int code) {
		this.status=status;
		this.code=code;
	}
	public DefaultResponseBody(StatusCodes statusCodes) {
		this.status = statusCodes.name();
		this.code= statusCodes.getCode();
	}
	
	public String toString() {
		ObjectMapper mapper=new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "{\"status\":\""+StatusCodes.CLASS_TO_JSON_FAIL.name()+"\",\"code\":"+StatusCodes.CLASS_TO_JSON_FAIL.getCode() +"}";
		}
	}
}
