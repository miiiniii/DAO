package com.virtualAsset.webServer.data;



import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class AssetInfo {
	private String assetId;
	private String name;
	private double valueChange;
	private String buyDate;
	private String buyClub;
	private String tag;
	private long buyPrice;
	private long currPrice; 
	private String currency;
	public AssetInfo(String assetId, String name, String buyDate, String buyClub, String tag,
			long buyPrice, long currPrice, String currency) {
		super();
		this.assetId = assetId;
		this.name = name;
		this.buyDate = buyDate.split(" ")[0].replaceAll("/0", "/").replace('/', '.');
		this.buyClub = buyClub;
		this.tag = tag;
		this.buyPrice = buyPrice;
		this.currPrice = currPrice;
		this.currency = currency;
		valueChange=Double.valueOf(Math.round(10000*(Double.valueOf(currPrice)/buyPrice -1)))/100;
	}
	public String getAssetId() {
		return assetId;
	}
	public String getName() {
		return name;
	}
	public double getValueChange() {
		return valueChange;
	}
	public String getBuyDate() {
		return buyDate;
	}
	public String getBuyClub() {
		return buyClub;
	}
	public String getTag() {
		return tag;
	}
	public long getBuyPrice() {
		return buyPrice;
	}
	public long getCurrPrice() {
		return currPrice;
	}
	public String getCurrency() {
		return currency;
	}
	public JSONObject toJsonObject() throws JSONException {
		JSONObject temp=new JSONObject();
		temp.put("assetId", assetId);
		temp.put("name", name);
		temp.put("valueChange", valueChange);
		temp.put("tag", tag);
		temp.put("buyPrice", buyPrice);
		temp.put("currPrice", currPrice);
		temp.put("buyClub", buyClub);
		temp.put("buyDate", buyDate);
		temp.put("currency", currency);
		
		
		return temp;
	}
}
