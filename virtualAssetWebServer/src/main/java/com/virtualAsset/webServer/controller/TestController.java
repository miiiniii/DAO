package com.virtualAsset.webServer.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
	
	@PostMapping("/ip")
	public ResponseEntity<String> ip (HttpServletRequest request){
		return ResponseEntity.ok(request.getRemoteAddr());
	}
	
	@PostMapping("/hello")
	public List<String> hello(){
		return Arrays.asList("hi", "안녕");
	}
}
