package com.virtualAsset.webServer.data;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class ClubBanner {
	private static DecimalFormat df=new DecimalFormat("###.#");
	private static String[] units= {"","k","M","G","T","P"};
	private SimpleDateFormat strToDate=new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
	private String clubId;
	private String name;
	private long concludedContractAmount;
	private long totalContractAmount;
	private long memberAmount;
	private String introduce;
	private ArrayList<String> tags;
	String recentActivities;
	
	public ClubBanner(String clubId, String name, long cca, long tca, long ma, String ra, String intro, ArrayList<String> tags) {
		this.concludedContractAmount=cca;
		this.memberAmount=ma;
		this.name=name;
		this.recentActivities=ra;
		this.totalContractAmount=tca;
		this.introduce=intro;
		this.tags=new ArrayList<String>(tags);
	}
	
	public String getName() {
		return name;
	}
	public long getIntConcludedContract() {
		return concludedContractAmount;
	}	
	public String getStringConcludedContract() {
		return intToRoundString(concludedContractAmount);
	}
	public long getIntTotalContract() {
		return totalContractAmount;
	}
	public String getStringTotalContract() {
		return intToRoundString(totalContractAmount);
	}
	public long getIntMemberAmt() {
		return memberAmount;
	}
	public String getStringMemberAmt() {
		return intToRoundString(memberAmount);
	}
	public String getRecentActivitiesDate() {
		return recentActivities;
	}
	public String getIntrduce() {
		return introduce;
	}
	public ArrayList<String> getTags(){
		return tags;
	}
	public String getRecentActivitiesDiff() throws ParseException {
		Date d=strToDate.parse(recentActivities);
		int diff=(int) ((System.currentTimeMillis()-d.getTime())/1000);
		if(diff>60) {
			diff/=60;
			if(diff>60) {
				diff/=60;
				if(diff>24) {
					diff/=24;
					if(diff>30) {
						diff/=30;
						if(diff>12) {
							diff/=12;
							return diff+"년";
						}
						return diff+"개월";
					}
					return diff+"일";
				}
				return diff+"시간";
			}
			return diff+"분";
		}
		return diff+"초";
	}
	public JSONObject toJsonObject() throws JSONException, ParseException {
		JSONObject temp=new JSONObject();
		temp.put("clubId", clubId);
		temp.put("name", name);
		temp.put("concludedContract", getStringConcludedContract());
		temp.put("totalContract", getStringTotalContract());
		temp.put("memberAmount", getStringMemberAmt());
		temp.put("recentActivities", getRecentActivitiesDiff());
		temp.put("introduce", introduce);
		temp.put("tags", new JSONArray(tags));
		return temp;
	}
	
	public static String intToRoundString(long val) {
		long t=1;
		int index=0;
		 
		while(val>t*1000) {
			index++;
			t*=1000;
		}
		return df.format((double)(val)/t)+units[index];
	}
}
