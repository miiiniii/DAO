package com.virtualAsset.webServer.controller;



import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.data.Auth;
import com.virtualAsset.webServer.data.ClubBanner;

@RestController
@RequestMapping("/api")
public class TestController {
	private static ObjectMapper mapper=new ObjectMapper();
	
	@PostMapping("/publicClub")
	public String pubClub(HttpServletRequest request) throws JSONException, ParseException {
		//test value
		ClubBanner standard =new ClubBanner("클럽이름", 26, 180, 111, "2022/03/30 16:22:45", "클럽 소개글\n클럽 소개글", new ArrayList<String>(Arrays.asList("품목","품목","품목","품목")));
		ClubBanner example1=new ClubBanner("휴양지 공동 개발",15,22,411,"2021/03/29 20:11:02","코로나로 저점이지만 앞으로 전망이 밝은 각종 휴양지를 전문으로 투자하실분들 모십니다.", new ArrayList<String>(Arrays.asList("휴양지","부동산","저점")));
		ClubBanner example2=new ClubBanner("홍대 갤러리",46,2130,11512,"2022/03/30 9:42:16","홍대 작가 유망주들의 작품 지분 투자", new ArrayList<String>(Arrays.asList("그림","조각")));
		ClubBanner example3=new ClubBanner("동학 개미 운동",71,182,85429,"2022/02/15 20:11:02","소자본으로 항상 세력들에게 끌려다니는 개미들도 뭉치면 강하다!", new ArrayList<String>(Arrays.asList("국내주식","해외주식","세력")));

		return new JSONArray().put(standard.toJsonObject()).put(standard.toJsonObject()).put(example1.toJsonObject()).put(example2.toJsonObject()).put(example3.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).toString();
	}
	
	@PostMapping("/myClubBanners")
	public String myClub(HttpServletRequest request) throws JSONException, ParseException {
		//test value
		ClubBanner standard =new ClubBanner("클럽이름", 26, 180, 111, "2022/03/30 16:22:45", "클럽 소개글\n클럽 소개글", new ArrayList<String>(Arrays.asList("품목","품목","품목","품목")));
		ClubBanner example1=new ClubBanner("휴양지 공동 개발",15,22,411,"2021/03/29 20:11:02","코로나로 저점이지만 앞으로 전망이 밝은 각종 휴양지를 전문으로 투자하실분들 모십니다.", new ArrayList<String>(Arrays.asList("휴양지","부동산","저점")));
		ClubBanner example2=new ClubBanner("홍대 갤러리",46,2130,11512,"2022/03/30 9:42:16","홍대 작가 유망주들의 작품 지분 투자", new ArrayList<String>(Arrays.asList("그림","조각")));
		ClubBanner example3=new ClubBanner("동학 개미 운동",71,182,85429,"2022/02/15 20:11:02","소자본으로 항상 세력들에게 끌려다니는 개미들도 뭉치면 강하다!", new ArrayList<String>(Arrays.asList("국내주식","해외주식","세력")));

		return new JSONArray().put(standard.toJsonObject()).put(standard.toJsonObject()).put(example1.toJsonObject()).put(example2.toJsonObject()).put(example3.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).put(standard.toJsonObject()).toString();
	}
	
	@PostMapping("/auth")
	public String userAuth (HttpServletRequest request){
		//test value
		
		//로그온 상태로 만들기
		Auth auth=new Auth("test_id","test_name", request.getRemoteAddr());
		
		//로그오프 상태로 만들기
		//Auth auth=new Auth(Auth.ErrorCode.FAIL_AUTHENTICATION);
		
		String json=null;
		try {
			json = mapper.writeValueAsString(auth);
		} catch (JsonProcessingException e) {
			json = "auth failed. "+e.toString();
		}
		return json;
	}
	
}
