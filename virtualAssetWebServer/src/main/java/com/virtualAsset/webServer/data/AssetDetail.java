package com.virtualAsset.webServer.data;
import java.util.ArrayList;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

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
	public AssetDetail(String assetId, String buyClubId,
			ArrayList<Long> pastPrice, Long currPrice, String responsible) {
		super();
		this.assetId = assetId;
		this.buyClubId = buyClubId;
		this.pastPrice = pastPrice;
		this.responsible = responsible;
		this.valueChangeHistory=new ArrayList<Double>();
		valueChangeHistory.add(0.0);
		for(int i=0; i<pastPrice.size()-1; i++) {
			valueChangeHistory.add(Double.valueOf(Math.round((Double.valueOf(pastPrice.get(i+1))/Double.valueOf(pastPrice.get(i))-1) *10000))/100);
		}
		valueChangeHistory.add(Double.valueOf(Math.round((Double.valueOf(currPrice)/Double.valueOf(pastPrice.get(pastPrice.size()-1))-1)*10000))/100);
	}
	public JSONObject toJsonObject() throws JSONException {
		JSONObject temp=new JSONObject();
		temp.put("assetId", assetId);
		temp.put("valueChangeHistory", new JSONArray(valueChangeHistory));
		temp.put("pastPrice", new JSONArray(pastPrice));
		temp.put("buyClubId", buyClubId);
		temp.put("responsible", responsible);
		temp.put("pastPrice", new JSONArray(pastPrice));
		
		return temp;
	}
}
