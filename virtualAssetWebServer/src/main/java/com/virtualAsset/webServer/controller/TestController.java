package com.virtualAsset.webServer.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.commons.KafkaConstants;
import com.virtualAsset.webServer.commons.StatusCodes;
import com.virtualAsset.webServer.dataAccessObject.AuthDAO;
import com.virtualAsset.webServer.dataAccessObject.CommunityDAO;
import com.virtualAsset.webServer.dataAccessObject.MsgRecordDAO;
import com.virtualAsset.webServer.entity.AssetDetail;
import com.virtualAsset.webServer.entity.AssetInfo;
import com.virtualAsset.webServer.entity.AuthEntity;
import com.virtualAsset.webServer.entity.BankAccount;
import com.virtualAsset.webServer.entity.ChannelEntity;
import com.virtualAsset.webServer.entity.ChannelTabEntity;
import com.virtualAsset.webServer.entity.CommunityBannerEntity;
import com.virtualAsset.webServer.entity.KafkaMSG;
import com.virtualAsset.webServer.responseBody.AuthValResponseBody;
import com.virtualAsset.webServer.responseBody.DefaultResponseBody;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;

/*데이터 베이스 바인드 하기전 임시로 더미데이터를 보내주는 컨트롤러*/
@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api")
public class TestController {
	private ObjectMapper mapper = new ObjectMapper();

	@PostMapping("/assetDetail")
	public String assetDetail(@RequestBody HashMap<String, Object> requsetHashMap)
			throws JSONException, JsonProcessingException {

		log.info(mapper.writeValueAsString(requsetHashMap));

		HashMap<String, AssetDetail> dataHashMap = new HashMap<String, AssetDetail>();

		dataHashMap.put("default",
				new AssetDetail("default", "default",
						new ArrayList<Long>(Arrays.asList(35000L, 44000L, 51000L, 55000L, 57000L, 53000L)), 52000L,
						"커뮤니티 책임자"));
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
		return dataHashMap.get(requsetHashMap.get("assetId")).toJsonObject().toString();
	}

	@PostMapping("/myAssets")
	public String myAsset(HttpServletRequest request) throws JSONException {
		// test val
		AssetInfo standard = new AssetInfo("default", "상품명", "2022/03/11 14:25:15", "커뮤니티명", "품목", 52000, 52000, "KRW");
		AssetInfo example1 = new AssetInfo("example1", "제주 힐링 리조트", "2022/03/11 14:25:15", "휴양지 공동 개발", "부동산", 15000000,
				23085220, "KRW");
		AssetInfo example2 = new AssetInfo("example2", "가상과 현실", "2021/10/05 14:25:15", "홍대 갤러리", "미술품", 1200000,
				1140000, "USD");
		AssetInfo example3 = new AssetInfo("example3", "에스디바이오센서", "2022/01/17 14:25:15", "동학 개미 운동", "국내주식", 788450,
				1001190, "KRW");

		return new JSONArray().put(standard.toJsonObject()).put(example1.toJsonObject()).put(example2.toJsonObject())
				.put(example3.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject())
				.put(standard.toJsonObject()).put(standard.toJsonObject()).toString();
		// return null;
	}

	@Autowired
	private CommunityDAO communityDAO;

	@PostMapping("/publicCommunity")
	public List<CommunityBannerEntity> pubClub(HttpServletRequest request) throws JSONException, ParseException {

		return communityDAO.selectAllBanners();
	}

	@PostMapping("/myCommunityBanners")
	public List<CommunityBannerEntity> myClub(HttpServletRequest request) throws JSONException, ParseException {

		return communityDAO.selectMyBanners("");

	}

	@Autowired
	MsgRecordDAO msgRecordDAO;

	@PostMapping("/getMsgs")
	public List<KafkaMSG> getMsgs(HttpServletRequest request) {
		return msgRecordDAO.selectAllMessages(KafkaConstants.KAFKA_TOPIC);
	}

	@PostMapping("/getMsgsLast")
	public List<KafkaMSG> getMsgsLast(HttpServletRequest request) {
		return msgRecordDAO.selectLast30Messages(KafkaConstants.KAFKA_TOPIC);
	}

	@PostMapping("/getMsgsFrom")
	public List<KafkaMSG> getMsgsFrom(@RequestBody JSONObject data, HttpServletRequest request) {
		log.info("getMsgsFrom"+data.toString());
		return msgRecordDAO.select30MessagesFrom(KafkaConstants.KAFKA_TOPIC, (int) data.getAsNumber("index"));
	}
	
	@PostMapping("/enterCommunity")
	public String enterClub(@RequestBody JSONObject data, HttpServletRequest request) {
		log.info("enterCommunity"+data.toString());
		return (communityDAO.enterCommunity((int)data.getAsNumber("communityId"), data.getAsString("auth")) == 1)?"true":"false";
	}
	
	@PostMapping("/getChannels")
	public List<ChannelEntity> getChannels(@RequestBody JSONObject data, HttpServletRequest request){
		log.info("getChannels"+data.toString());
		return communityDAO.getChannels((int)data.getAsNumber("communityId"));
	}
	@PostMapping("/getChannelTabs")
	public List<ChannelTabEntity> getChannelTabs(@RequestBody JSONObject data, HttpServletRequest request){
		log.info("getChannelTabs"+data.toString());
		return communityDAO.getChannelTabs((int)data.getAsNumber("communityId"));
	}
	
	@PostMapping("/editMsg")
	public DefaultResponseBody editMsg(@RequestBody JSONObject data, HttpServletRequest request) {
		log.info(data.toString());
		KafkaMSG updateMsg = new KafkaMSG((Long) data.getAsNumber("msgId"), data.getAsString("author"), null,
				data.getAsString("content"), null, null, true);
		int result = msgRecordDAO.updateMessage(updateMsg);
		if (result == 1) {
			return new DefaultResponseBody(StatusCodes.REQ_SUCCESS);
		} else {
			return new DefaultResponseBody(StatusCodes.REQ_FAIL,"Author is not matched");
		}
	}

	@Autowired
	private AuthDAO authDAO;

	@PostMapping("/auth")
	public DefaultResponseBody userAuth(@RequestBody JSONObject authVal, HttpServletRequest request) {
		String userPw = authDAO.getPassword(authVal.getAsString("id"));
		if (userPw != null && userPw.equals(authVal.getAsString("pw"))) {
			AuthEntity authEntity = authDAO.getUserInfo(authVal.getAsString("id"));
			return new AuthValResponseBody(StatusCodes.AUTH_SUCCESS, authEntity);
		}
		return new DefaultResponseBody(StatusCodes.FAIL_AUTHENTICATION);
	}

	@PostMapping("/bankAccount")
	public String bankAccount(HttpServletRequest request) throws JSONException {
		// test val
		BankAccount standard = new BankAccount("케이뱅크", "123456789000");
		return new JSONArray().put(standard.toJsonObject()).toString();
	}
}
