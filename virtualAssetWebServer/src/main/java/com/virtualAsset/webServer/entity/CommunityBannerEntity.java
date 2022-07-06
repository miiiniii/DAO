package com.virtualAsset.webServer.entity;

import java.io.Serializable;

public class CommunityBannerEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getConcludedContractAmount() {
		return concludedContractAmount;
	}
	public void setConcludedContractAmount(Integer concludedContractAmount) {
		this.concludedContractAmount = concludedContractAmount;
	}
	public Integer getTotalContractAmount() {
		return totalContractAmount;
	}
	public void setTotalContractAmount(Integer totalContractAmount) {
		this.totalContractAmount = totalContractAmount;
	}
	public Integer getMemberAmount() {
		return memberAmount;
	}
	public void setMemberAmount(Integer memberAmount) {
		this.memberAmount = memberAmount;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
	public Integer getRecentActivity() {
		return recentActivity;
	}
	public void setRecentActivity(Integer recentActivity) {
		this.recentActivity = recentActivity;
	}
	Integer id;
	String name;
	Integer concludedContractAmount;
	Integer totalContractAmount;
	Integer memberAmount;
	String introduce;
	String tags;
	Integer recentActivity;
	
}
