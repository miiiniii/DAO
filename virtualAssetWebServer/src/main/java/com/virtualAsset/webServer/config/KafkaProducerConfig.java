package com.virtualAsset.webServer.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.IntegerSerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import com.virtualAsset.webServer.commons.KafkaConstants;
import com.virtualAsset.webServer.entity.KafkaMSG;

@EnableKafka
@Configuration
public class KafkaProducerConfig {
	
	@Bean
	public KafkaTemplate<String, KafkaMSG> kafkaTemplate() {
		return new KafkaTemplate<>(producerFactory());
	}
	
	@Bean
	public ProducerFactory<String, KafkaMSG> producerFactory(){
		return new DefaultKafkaProducerFactory<>(producerConfigurations(), new StringSerializer(), new JsonSerializer<>());
	}
	
	@Bean
	public Map<String, Object> producerConfigurations(){
		Map<String, Object> configurations = new HashMap<>();
        configurations.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER);
        configurations.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configurations.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return configurations;
	}
	
}
