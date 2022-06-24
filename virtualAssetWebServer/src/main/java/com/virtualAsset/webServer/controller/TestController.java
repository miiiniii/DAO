package com.virtualAsset.webServer.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.entity.AssetDetail;
import com.virtualAsset.webServer.entity.AssetInfo;
import com.virtualAsset.webServer.entity.Auth;
import com.virtualAsset.webServer.entity.BankAccount;
import com.virtualAsset.webServer.entity.CommunityBanner;


/*데이터 베이스 바인드 하기전 임시로 더미데이터를 보내주는 컨트롤러*/
//각 데이터 모델에 toJsonObject 함수를 구현줘야함
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

	@PostMapping("/publicCommunity")
	public String pubClub(HttpServletRequest request) throws JSONException, ParseException {
		// test value
		CommunityBanner standard = new CommunityBanner("default", "커뮤니티이름", 26, 180, 111,
				"2022/03/30 16:22:45", "커뮤니티 소개글\n커뮤니티 소개글",
				new ArrayList<String>(Arrays.asList("품목", "품목", "품목", "품목")));
		CommunityBanner example1 = new CommunityBanner("example1", "휴양지 공동 개발", 15, 22,
				411, "2021/03/29 20:11:02",
				"코로나로 저점이지만 앞으로 전망이 밝은 각종 휴양지를 전문으로 투자하실분들 모십니다.",
				new ArrayList<String>(Arrays.asList("휴양지", "부동산", "저점")));
		CommunityBanner example2 = new CommunityBanner("example2", "홍대 갤러리", 46, 2130,
				11512, "2022/03/30 9:42:16", "홍대 작가 유망주들의 작품 지분 투자",
				new ArrayList<String>(Arrays.asList("그림", "조각")));
		CommunityBanner example3 = new CommunityBanner("example3", "동학 개미 운동", 71, 182,
				85429, "2022/02/15 20:11:02",
				"소자본으로 항상 세력들에게 끌려다니는 개미들도 뭉치면 강하다!",
				new ArrayList<String>(Arrays.asList("국내주식", "해외주식", "세력")));

		return new JSONArray().put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(example1.toJsonObject())
				.put(example2.toJsonObject()).put(example3.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject())
				.toString();
	}

	@PostMapping("/myCommunityBanners")
	public String myClub(HttpServletRequest request) throws JSONException, ParseException {
		// test value
		CommunityBanner standard = new CommunityBanner("default", "커뮤니티이름", 26, 180, 111, "2022/03/30 16:22:45", "커뮤니티 소개글\n커뮤니티 소개글",
				new ArrayList<String>(Arrays.asList("품목", "품목", "품목", "품목")));
		CommunityBanner example1 = new CommunityBanner("example1", "휴양지 공동 개발", 15, 22, 411, "2021/03/29 20:11:02",
				"코로나로 저점이지만 앞으로 전망이 밝은 각종 휴양지를 전문으로 투자하실분들 모십니다.",
				new ArrayList<String>(Arrays.asList("휴양지", "부동산", "저점")));
		CommunityBanner example2 = new CommunityBanner("example2", "홍대 갤러리", 46, 2130, 11512, "2022/03/30 9:42:16",
				"홍대 작가 유망주들의 작품 지분 투자", new ArrayList<String>(Arrays.asList("그림", "조각")));
		CommunityBanner example3 = new CommunityBanner("example3", "동학 개미 운동", 71, 182, 85429, "2022/02/15 20:11:02",
				"소자본으로 항상 세력들에게 끌려다니는 개미들도 뭉치면 강하다!", new ArrayList<String>(Arrays.asList("국내주식", "해외주식", "세력")));

		return new JSONArray().put(standard.toJsonObject()).put(standard.toJsonObject()).put(example1.toJsonObject())
				.put(example2.toJsonObject()).put(example3.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).toString();
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
