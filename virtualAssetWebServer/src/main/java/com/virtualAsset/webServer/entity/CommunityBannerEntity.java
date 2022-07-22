package com.virtualAsset.webServer.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class CommunityBannerEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	Integer id;
	String name;
	Integer concludedContractAmount;
	Integer totalContractAmount;
	Integer memberAmount;
	String introduce;
	String tags;
	Integer recentActivity;
	
}
