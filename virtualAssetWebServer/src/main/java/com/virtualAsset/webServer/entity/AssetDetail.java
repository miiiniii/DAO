package com.virtualAsset.webServer.entity;
import java.util.ArrayList;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;


/**
 * 자산 상세정보 데이터 모델
 * <pre>
 *<b>History:<b/>
 *     안성찬, 1.0, 2022.5.13 작성
 * @author 안성찬
 * @version 1.0, 2022.5.13
 * @see None
 */
public class AssetDetail {
	private String assetId;
	private ArrayList<Double> valueChangeHistory;
	private String buyClubId;
	private ArrayList<Long> pastPrice;
	private Long currPrice;
	private String responsible;
	public String getAssetId() {
		return assetId;
	}
	public ArrayList<Double> getValueChangeHistory() {
		return valueChangeHistory;
	}
	public String getBuyClubId() {
		return buyClubId;
	}
	public ArrayList<Long> getPastPrice() {
		return pastPrice;
	}
	public String getResponsible() {
		return responsible;
	}
	public Long getCurrLong() {
		return currPrice;
	}
	/**
	 * 클래스가 생성될때 pastPrice를 기반으로 valueChangeHistory가 만들어진다.
	 * 
	 * @param assetId 자산 ID
	 * @param buyClubId 이 자산을 구입한 클럽의 ID
	 * @param pastPrice 이 자산의 가치 변동 이력
	 * @param currPrice 현재 자산 가치
	 * @param responsible 이 자산을 구매하면서 작성한 계약의 책임자
	 */
	public AssetDetail(String assetId, String buyClubId,
			ArrayList<Long> pastPrice, Long currPrice, String responsible) {
		super();
		this.assetId = assetId;
		this.buyClubId = buyClubId;
		this.pastPrice = pastPrice;
		this.responsible = responsible;
		this.valueChangeHistory=new ArrayList<Double>();
		valueChangeHistory.add(0.0);
		this.currPrice=currPrice;
		for(int i=0; i<pastPrice.size()-1; i++) {
			valueChangeHistory.add(Double.valueOf(Math.round((Double.valueOf(pastPrice.get(i+1))/Double.valueOf(pastPrice.get(i))-1) *10000))/100);
		}
		valueChangeHistory.add(Double.valueOf(Math.round((Double.valueOf(currPrice)/Double.valueOf(pastPrice.get(pastPrice.size()-1))-1)*10000))/100);
	}
	
	/**
	 * @return 자산의 모든 정보를 Json으로 인코딩해 반환
	 * @throws JSONException
	 */
	public JSONObject toJsonObject() throws JSONException {
		JSONObject temp=new JSONObject();
		temp.put("assetId", assetId);
		temp.put("valueChangeHistory", new JSONArray(valueChangeHistory));
		temp.put("pastPrice", new JSONArray(pastPrice));
		temp.put("buyClubId", buyClubId);
		temp.put("responsible", responsible);
		
		return temp;
	}
}
