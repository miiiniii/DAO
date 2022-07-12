package com.virtualAsset.webServer.controller;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualAsset.webServer.commons.KafkaConstants;
import com.virtualAsset.webServer.entity.KafkaMSG;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping(value="/api/kafka")
public class KafkaController {
	
	private final Logger log = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    private KafkaTemplate<String, KafkaMSG> kafkaTemplate;

    @PostMapping(value = "/publish")
    public void sendMessage(@RequestBody KafkaMSG message) {
        log.info("Produce message : " + message.toString());
        message.setTimestamp(LocalDateTime.now().toString());
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/group")
    public KafkaMSG broadcastGroupMessage(@Payload KafkaMSG message) {
        return message;
    }
}
