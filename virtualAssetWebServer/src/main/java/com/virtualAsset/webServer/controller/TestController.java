package com.virtualAsset.webServer.controller;



import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualAsset.webServer.data.Auth;

@RestController
@RequestMapping("/api")
public class TestController {
	private static ObjectMapper mapper=new ObjectMapper();
	
	@PostMapping("/publicClub")
	public String pubClub(HttpServletRequest request) {
		//test value
				JSONArray ja=new JSONArray();
				JSONObject jo=new JSONObject();
				JSONObject jo1=new JSONObject();
				JSONObject jo2=new JSONObject();
				JSONObject jo3=new JSONObject();
				try {
					jo.put("name", "클럽 이름");
					jo.put("concludedContract", "26");
					jo.put("totalContract", "180");
					jo.put("member", "111");
					jo.put("recentActivities", "1개월");
					jo.put("tag", new JSONArray().put("품목").put("품목").put("품목").put("품목"));
					jo.put("intro", "클럽 소개글\n클럽 소개글");
					ja.put(jo);
					ja.put(jo);
					jo1.put("name", "휴양지 공동 개발");
					jo1.put("concludedContract", "15");
					jo1.put("totalContract", "22");
					jo1.put("member", "411");
					jo1.put("recentActivities", "2주");
					jo1.put("tag", new JSONArray().put("휴양지").put("부동산").put("저점"));
					jo1.put("intro", "코로나로 저점이지만 앞으로 전망이 밝은 각종 휴양지를 전문으로 투자하실분들 모십니다.");
					ja.put(jo1);			
					jo2.put("name", "홍대 갤러리");
					jo2.put("concludedContract", "46");
					jo2.put("totalContract", "2130");
					jo2.put("member", "11.5k");
					jo2.put("recentActivities", "48분");
					jo2.put("tag", new JSONArray().put("그림").put("조각"));
					jo2.put("intro", "홍대 작가 유망주들의 작품 지분 투자");
					ja.put(jo2);			
					jo3.put("name", "동학 개미 운동");
					jo3.put("concludedContract", "71");
					jo3.put("totalContract", "182");
					jo3.put("member", "85.4k");
					jo3.put("recentActivities", "11일");
					jo3.put("tag", new JSONArray().put("국내주식").put("해외주식").put("세력"));
					jo3.put("intro", "소자본으로 항상 세력들에게 끌려다니는 개미들도 뭉치면 강하다!");
					ja.put(jo3);
					ja.put(jo);
					ja.put(jo);
					ja.put(jo);
					ja.put(jo);
					ja.put(jo);
					ja.put(jo);					
					ja.put(jo);
					ja.put(jo);
					ja.put(jo);
				} catch (JSONException e) {
					e.printStackTrace();
				}
				
				//return "";
				return ja.toString();
	}
	
	@PostMapping("/myClubBanners")
	public String myClub(HttpServletRequest request) {
		//test value
		JSONArray ja=new JSONArray();
		JSONObject jo=new JSONObject();
		JSONObject jo1=new JSONObject();
		JSONObject jo2=new JSONObject();
		JSONObject jo3=new JSONObject();
		try {
			jo.put("name", "클럽 이름");
			jo.put("concludedContract", "26");
			jo.put("totalContract", "180");
			jo.put("member", "111");
			jo.put("recentActivities", "1개월");
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
			jo1.put("name", "휴양지 공동 개발");
			jo1.put("concludedContract", "15");
			jo1.put("totalContract", "22");
			jo1.put("member", "411");
			jo1.put("recentActivities", "2주");
			ja.put(jo1);			
			jo2.put("name", "홍대 갤러리");
			jo2.put("concludedContract", "46");
			jo2.put("totalContract", "2130");
			jo2.put("member", "11.5k");
			jo2.put("recentActivities", "48분");
			ja.put(jo2);			
			jo3.put("name", "동학 개미 운동");
			jo3.put("concludedContract", "71");
			jo3.put("totalContract", "182");
			jo3.put("member", "85.4k");
			jo3.put("recentActivities", "11일");
			ja.put(jo3);
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
			ja.put(jo);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		//return "";
		return ja.toString();
	}
	
	@PostMapping("/auth")
	public String userAuth (HttpServletRequest request){
		//test value
		Auth auth=new Auth("test_id","test_name", request.getRemoteAddr());
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
