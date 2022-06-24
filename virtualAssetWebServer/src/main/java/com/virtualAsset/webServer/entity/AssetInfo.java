package com.virtualAsset.webServer.entity;



import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

/**
 * 자산 정보 데이터 모델
 * <pre>
 *<b>History:<b/>
 *     안성찬, 1.0, 2022.5.13 작성
 * @author 안성찬
 * @version 1.0, 2022.5.13
 * @see None
 */
public class AssetInfo {
	private String assetId;
	private String name;
	private double valueChangeRate;
	private String buyDate;
	private String buyClubId;
	private String tag;
	private long buyPrice;
	private long currPrice; 
	private String currency;
	/**
	 * valueChangeRate는 currPrice/buyPrice 로 클래스 생성시 자동계산
	 * @param assetId 자산 id
	 * @param name 자산 이름
	 * @param buyDate 구매일
	 * @param buyClubId 구매 클럽
	 * @param tag 품목
	 * @param buyPrice 구매 가격
	 * @param currPrice 현재 가격
	 * @param currency 거래 통화
	 */
	public AssetInfo(String assetId, String name, String buyDate, String buyClubId, String tag,
			long buyPrice, long currPrice, String currency) {
		super();
		this.assetId = assetId;
		this.name = name;
		this.buyDate = buyDate.split(" ")[0].replaceAll("/0", "/").replace('/', '.');
		this.buyClubId = buyClubId;
		this.tag = tag;
		this.buyPrice = buyPrice;
		this.currPrice = currPrice;
		this.currency = currency;
		valueChangeRate=Double.valueOf(Math.round(10000*(Double.valueOf(currPrice)/buyPrice -1)))/100;
	}
	public String getAssetId() {
		return assetId;
	}
	public String getName() {
		return name;
	}
	public double getValueChange() {
		return valueChangeRate;
	}
	public String getBuyDate() {
		return buyDate;
	}
	public String getBuyClub() {
		return buyClubId;
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
		temp.put("valueChange", valueChangeRate);
		temp.put("tag", tag);
		temp.put("buyPrice", buyPrice);
		temp.put("currPrice", currPrice);
		temp.put("buyClub", buyClubId);
		temp.put("buyDate", buyDate);
		temp.put("currency", currency);
		
		
		return temp;
	}
}
