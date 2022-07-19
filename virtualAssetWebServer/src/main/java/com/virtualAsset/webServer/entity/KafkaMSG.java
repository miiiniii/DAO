package com.virtualAsset.webServer.entity;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class KafkaMSG implements Serializable {
	private static final long serialVersionUID = 1L;
	private String author;
	@Builder.Default
	private String contentType="msg";
	private String content;
	private String timestamp;
	private String topic;
	@Builder.Default
	private boolean isEdited = false;
	@Override
	public String toString() {
		return "Message{" +
                "author='" + author + '\'' +
                ", contentType='"+contentType+"'"+
                ", content='" + content + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
	}
	public KafkaMSG() {
		
	}
	
	public KafkaMSG(String author, String contentType, String content, String timestamp,String topic, boolean isEdited) {
		super();
		this.author = author;
		this.contentType=contentType;
		this.content = content;
		this.timestamp=timestamp;
		this.isEdited=isEdited;
		this.topic=topic;
	}
	
}
