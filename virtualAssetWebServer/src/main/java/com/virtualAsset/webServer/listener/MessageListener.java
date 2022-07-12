package com.virtualAsset.webServer.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.virtualAsset.webServer.commons.KafkaConstants;
import com.virtualAsset.webServer.entity.KafkaMSG;

@Component
public class MessageListener {

	private final Logger log = LoggerFactory.getLogger(this.getClass());
    
	@Autowired
    SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(KafkaMSG message) {

        log.info("sending via kafka listener..");
        template.convertAndSend("/topic/group", message);
    }
}