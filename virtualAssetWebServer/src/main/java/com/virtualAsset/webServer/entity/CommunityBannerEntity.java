package com.virtualAsset.webServer.entity;


public class CommunityBannerEntity {
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
	public String[] getTags() {
		return tags;
	}
	public void setTags(String[] tags) {
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
	String[] tags;
	Integer recentActivity;

	
	/**
	 * @param communityId 커뮤니티
	 * @param name 커뮤니티 이름
	 * @param concludedContractAmount 체결된 계약 수
	 * @param totalContractAmount 총 계약 수
	 * @param memberAmount 맴버 수
	 * @param recentActivities 최든 활동
	 * @param introduce 소개글
	 * @param tags 취급 품목
	 */
	
}
