package com.virtualAsset.webServer.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
	@GetMapping("hello")
	public List<String> hello(){
		return Arrays.asList("hi", "안녕");
	}
}
