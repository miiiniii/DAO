package com.virtualAsset.webServer.data;

import java.sql.Date;
import java.text.DecimalFormat;

public class ClubBanner {
	private static DecimalFormat df=new DecimalFormat("#,###.#");
	private static String[] units= {" ","k","M","G","T"};
	private String name;
	private int concludedContractAmount;
	private int totalContractAmount;
	private int memberAmount;
	Date recentActivities;
	public ClubBanner(String name, int cca, int tca, int ma, Date ra) {
		this.concludedContractAmount=cca;
		this.memberAmount=ma;
		this.name=name;
		this.recentActivities=ra;
		this.totalContractAmount=tca;
	}
	public String getName() {
		return name;
	}
	public int getConcludedContract() {
		return concludedContractAmount;
	}
	public int getTotalContract() {
		return totalContractAmount;
	}
	public String getMember() {
		//return memberAmount;
		//*
		int t=1, index=0;
		 
		while(memberAmount<t*1000) {
			index++;
			t*=1000;
		}
		return df.format(memberAmount/t)+units[index];
	//*/
	}
	public Date getRecentActivities() {
		return recentActivities;
	}
	
}
