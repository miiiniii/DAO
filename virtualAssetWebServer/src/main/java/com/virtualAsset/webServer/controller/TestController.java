package com.virtualAsset.webServer.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.dataAccessObject.CommunityBannerDAO;
import com.virtualAsset.webServer.entity.AssetDetail;
import com.virtualAsset.webServer.entity.AssetInfo;
import com.virtualAsset.webServer.entity.Auth;
import com.virtualAsset.webServer.entity.BankAccount;
import com.virtualAsset.webServer.entity.CommunityBannerEntity;


/*데이터 베이스 바인드 하기전 임시로 더미데이터를 보내주는 컨트롤러*/
@RestController
@RequestMapping("/api")
public class TestController {
	private static ObjectMapper mapper = new ObjectMapper();
	@PostMapping("/assetDetail")
	public String assetDetail(@RequestBody HashMap<String, Object> requsetHashMap) throws JSONException {
		HashMap<String, AssetDetail> dataHashMap = new HashMap<String, AssetDetail>();
		dataHashMap.put("default", new AssetDetail("default", "default",
				new ArrayList<Long>(Arrays.asList(35000L, 44000L, 51000L, 55000L, 57000L, 53000L)), 52000L, "커뮤니티 책임자"));
		dataHashMap.put("example1",
				new AssetDetail("example1", "example1",
						new ArrayList<Long>(
								Arrays.asList(22030070L, 22110750L, 22395500L, 22462110L, 22810570L, 23310570L)),
						23085220L, "커뮤니티 책임자"));
		dataHashMap.put("example2",
				new AssetDetail("example2", "example2",
						new ArrayList<Long>(Arrays.asList(1180000L, 1180000L, 1170000L, 1150000L, 1140000L, 1140000L)),
						1140000L, "커뮤니티 책임자"));
		dataHashMap.put("example3",
				new AssetDetail("example3", "example3",
						new ArrayList<Long>(Arrays.asList(820220L, 894150L, 911120L, 998020L, 1170400L, 1251000L)),
						1001190L, "커뮤니티 책임자"));
		return dataHashMap.get(requsetHashMap.get("assetId")).toJsonObject()
				.toString();
	}

	@PostMapping("/myAssets")
	public String myAsset(HttpServletRequest request) throws JSONException {
		// test val
		AssetInfo standard = new AssetInfo("default", "상품명",
				"2022/03/11 14:25:15", "커뮤니티명", "품목", 52000, 52000, "KRW");
		AssetInfo example1 = new AssetInfo("example1", "제주 힐링 리조트",
				"2022/03/11 14:25:15", "휴양지 공동 개발", "부동산", 15000000,
				23085220, "KRW");
		AssetInfo example2 = new AssetInfo("example2", "가상과 현실",
				"2021/10/05 14:25:15", "홍대 갤러리", "미술품", 1200000,
				1140000, "USD");
		AssetInfo example3 = new AssetInfo("example3", "에스디바이오센서",
				"2022/01/17 14:25:15", "동학 개미 운동", "국내주식", 788450,
				1001190, "KRW");

		return new JSONArray().put(standard.toJsonObject())
				.put(example1.toJsonObject()).put(example2.toJsonObject())
				.put(example3.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).toString();
		// return null;
	}

	@Autowired
	private CommunityBannerDAO communityBannerDAO;
	
	
	@PostMapping("/publicCommunity")
	public List<CommunityBannerEntity> pubClub(HttpServletRequest request) throws JSONException, ParseException {

		return communityBannerDAO.selectAllBanners();
	}

	
	@PostMapping("/myCommunityBanners")
	public List<CommunityBannerEntity> myClub(HttpServletRequest request) throws JSONException, ParseException {
		
		
		return communityBannerDAO.selectMyBanners("");
		
	}

	@PostMapping("/auth")
	public String userAuth(HttpServletRequest request) {
		// test value

		// 로그온 상태로 만들기
		Auth auth = new Auth("test_id", "test_name", request.getRemoteAddr());

		// 로그오프 상태로 만들기
		 //Auth auth = new Auth(Auth.ErrorCode.FAIL_AUTHENTICATION);

		String json = null;
		try {
			json = mapper.writeValueAsString(auth);
		} catch (JsonProcessingException e) {
			json = "auth failed. " + e.toString();
		}
		return json;
	}

	@PostMapping("/bankAccount")
	public String bankAccount(HttpServletRequest request) throws JSONException {
		// test val
		BankAccount standard = new BankAccount("한국은행", "1230456078900");
		BankAccount example1 = new BankAccount("우리은행", "1212343456567");
		BankAccount example2 = new BankAccount("기업은행", "0987654321");
		BankAccount example3 = new BankAccount("하나은행", "112233445566");
		BankAccount example4 = new BankAccount("카카오뱅크", "009988776655");

		return new JSONArray().put(example1.toJsonObject())
				.put(example1.toJsonObject()).put(example2.toJsonObject())
				.put(example3.toJsonObject()).put(example4.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).toString();
	}
}
