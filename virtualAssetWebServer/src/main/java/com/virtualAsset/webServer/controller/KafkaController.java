package com.virtualAsset.webServer.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualAsset.webServer.commons.KafkaConstants;
import com.virtualAsset.webServer.commons.StatusCodes;
import com.virtualAsset.webServer.dataAccessObject.AuthDAO;
import com.virtualAsset.webServer.dataAccessObject.MsgRecordDAO;
import com.virtualAsset.webServer.entity.KafkaMSG;
import com.virtualAsset.webServer.responseBody.DefaultResponseBody;
import com.virtualAsset.webServer.responseBody.ErrorResponseBody;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping(value="/api/kafka")
public class KafkaController {
    
    @Autowired
    private KafkaTemplate<String, KafkaMSG> kafkaTemplate;
    
    @Autowired
    private MsgRecordDAO msgRecordDAO;
    
    @PostMapping(value = "/publish")
    public DefaultResponseBody sendMessage(@RequestBody KafkaMSG message) {
        message.setTimestamp(LocalDateTime.now().toString());
        log.info("Produce message : " + message.toString());
        try {
        	log.info(kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get().toString());
        } catch (Exception e) {
        	e.printStackTrace();
            return new ErrorResponseBody(StatusCodes.MSG_SEND_FAIL, e.getMessage());
        }
        try {
        	msgRecordDAO.insertMessage(message);
        }
        catch(Exception e){
        	e.printStackTrace();
        }
        return new DefaultResponseBody(StatusCodes.MSG_SEND_SUCCESS);
    }
    @MessageMapping("/sendMessage")
    @SendTo("/topic/channel")
    public KafkaMSG broadcastGroupMessage(@Payload KafkaMSG message) {
    	log.info("broadcastGroupMessage - "+message.toString());
        return message;
    }
    
	@Autowired
    SimpMessagingTemplate template;
	@Autowired
	AuthDAO authDAO;
	
    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(KafkaMSG message) {
    	try {
        message.setAuthor(authDAO.getUserInfo(message.getAuthor()).getNick());
        log.info("Listen - "+message.toString());
        template.convertAndSend("/topic/channel/"+message.getTopic(), message);
    	}catch(Exception e) {e.printStackTrace();}
    }
}
