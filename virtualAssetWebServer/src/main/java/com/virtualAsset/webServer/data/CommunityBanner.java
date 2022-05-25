package com.virtualAsset.webServer.data;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import com.virtualAsset.webServer.data.CommunityIntroduce.TradeHistory;


/**
 * 커뮤니티 배너 데이터 모델
 * <pre>
 *<b>History:<b/>
 *     안성찬, 1.0, 2022.5.13 작성
 * @author 안성찬
 * @version 1.0, 2022.5.13
 * @see TradeHistory
 * @see None
 */
public class CommunityBanner {
	private static DecimalFormat df=new DecimalFormat("###.#");
	private static String[] units= {"","k","M","G","T","P"};
	private SimpleDateFormat strToDate=new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
	private String communityId;
	private String name;
	private long concludedContractAmount;
	private long totalContractAmount;
	private long memberAmount;
	private String introduce;
	private ArrayList<String> tags;
	String recentActivities;
	/**
	 * @param communityId 커뮤니티 소개글
	 * @param name 커뮤니티 이름
	 * @param concludedContractAmount 체결된 계약 수
	 * @param totalContractAmount 총 계약 수
	 * @param memberAmount 맴버 수
	 * @param recentActivities 최든 활동
	 * @param introduce 소개글
	 * @param tags 취급 품목
	 */
	public CommunityBanner(String communityId, 
			String name, 
			long concludedContractAmount, 
			long totalContractAmount, 
			long memberAmount, 
			String recentActivities, 
			String introduce, 
			ArrayList<String> tags) {
		this.concludedContractAmount=concludedContractAmount;
		this.memberAmount=memberAmount;
		this.name=name;
		this.recentActivities=recentActivities;
		this.totalContractAmount=totalContractAmount;
		this.introduce=introduce;
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
	
	/**
	 * @return 최근 활동 n분/시간/일/개월/년 전 으로 파싱
	 * @throws ParseException
	 */
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
	/**
	 * @return Json으로 인코딩해 반환
	 * @throws JSONException
	 * @throws ParseException
	 */
	public JSONObject toJsonObject() throws JSONException, ParseException {
		JSONObject temp=new JSONObject();
		temp.put("clubId", communityId);
		temp.put("name", name);
		temp.put("concludedContract", getStringConcludedContract());
		temp.put("totalContract", getStringTotalContract());
		temp.put("memberAmount", getStringMemberAmt());
		temp.put("recentActivities", getRecentActivitiesDiff());
		temp.put("introduce", introduce);
		temp.put("tags", new JSONArray(tags));
		return temp;
	}
	
	/**<pre>
	 *long을 k/M/G/T/P 등 1000^n단위로 파싱해서 소수점 둘째자리에서 반올림
	 *1234 -> 1.2k
	 *1234567 -> 1.2M
	 *</pre>
	 * @param val 파싱할 값
	 * @return 파싱된 String 값
	 */
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
