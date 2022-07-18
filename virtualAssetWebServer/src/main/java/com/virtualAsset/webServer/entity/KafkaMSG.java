package com.virtualAsset.webServer.entity;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class KafkaMSG implements Serializable {
	private String author;
	private String content;
	private String timestamp;
	
	@Override
	public String toString() {
		return "Message{" +
                "author='" + author + '\'' +
                ", content='" + content + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
	}
	public KafkaMSG() {
		
	}
	
	public KafkaMSG(String author, String content, String timestamp) {
		super();
		this.author = author;
		this.content = content;
		this.timestamp=timestamp;
	}
	
}
