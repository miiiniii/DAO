package com.virtualAsset.webServer.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class ChannelTabEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	String name;
	long id;
	int index;
	
}
