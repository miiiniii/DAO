package com.virtualAsset.webServer.entity;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class KafkaMSG implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long msgId;
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
                ", topic='" + topic + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
	}
	public KafkaMSG() {
		
	}
	
	public KafkaMSG(Long msgId, String author, String contentType, String topic, String content, String timestamp, boolean isEdited) {
		super();
		this.msgId=msgId;
		this.author = author;
		this.contentType=contentType;
		this.content = content;
		this.timestamp=timestamp;
		this.isEdited=isEdited;
		this.topic=topic;
	}
	
}
