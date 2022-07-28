package com.virtualAsset.webServer.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.virtualAsset.webServer.commons.KafkaConstants;
import com.virtualAsset.webServer.entity.KafkaMSG;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@Component
public class MessageListener {
    
	@Autowired
    SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(KafkaMSG message) {
        log.info("sending via kafka listener..");
        template.convertAndSend("/topic/channel/"+message.getTopic(), message);
    }
}