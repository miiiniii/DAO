package com.virtualAsset.webServer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	/**
	 * 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로
	 * 운영 환경에 배포할 경우에는 15~18행을 주석 처리합니다.
	 * 
	 * ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제
	 */

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		/*안성찬 로컬*/final String ip= "211.193.12.31";
		//*안성찬 회사*/final String ip= "192.168.30.14";

		//*지상은 로컬*/final String ip="172.30.1.35";

		//*권예빈 로컬*/final String ip= "192.168.137.179";
		//*우성주 z동*/final String ip= "192.168.0.6";
		//*우성주 t동*/final String ip= "192.168.0.148";
		//*박선민 t동*/final String ip ="192.168.0.149";
		//*박선민 로컬 */final String ip="172.30.1.21";
		//*양식*/final String ip= "127.0.0.1";
		
		
		registry.addMapping("/api/**")
		.allowedOrigins("http://"+ip+":3000")
		.allowCredentials(true)
		.allowedMethods("POST","GET")
		.maxAge(3600);
		
	}

}