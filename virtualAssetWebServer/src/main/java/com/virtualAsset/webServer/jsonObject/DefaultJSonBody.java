package com.virtualAsset.webServer.jsonObject;

import java.io.Serializable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.commons.StatusCodes;

public class DefaultJSonBody implements Serializable{
	private static final long serialVersionUID = 1L;
	String status;
	int code;
	public DefaultJSonBody(String status, int code) {
		this.status=status;
		this.code=code;
	}
	public DefaultJSonBody(StatusCodes statusCodes) {
		this.status = statusCodes.name();
		this.code= statusCodes.getCode();
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	
	public String toString() {
		ObjectMapper mapper=new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			return e.getMessage();
		}
	}
}
