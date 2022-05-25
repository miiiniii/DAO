package com.virtualAsset.webServer.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


//데이터베이스 바인드 후 실제로 구현이 될 컨트롤러
@RestController
public class MainController {
	@GetMapping("hello")
	public List<String> hello(){
		return Arrays.asList("hi", "안녕");
	}
}
