package com.virtualAsset.webServer.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class ChannelEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	long tabId;
	long id;
	String name;
	boolean isClub;
	int memberCnt;
	int index;
	String contractStatus;
	boolean isPrivate;
	boolean isDefault;
}
