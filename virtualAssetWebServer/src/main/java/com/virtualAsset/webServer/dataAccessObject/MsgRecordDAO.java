package com.virtualAsset.webServer.dataAccessObject;

import java.util.List;

import com.virtualAsset.webServer.entity.KafkaMSG;

public interface MsgRecordDAO {
	public List<KafkaMSG> selectAllMessages();
	public List<KafkaMSG> selectLast30Messages(String topic);
	public List<KafkaMSG> select30MessagesFrom(String topic, int index);
	public KafkaMSG selectMessageById(Long id);
	public int insertMessage(KafkaMSG msg);
	public int updateMessage(KafkaMSG msg);
}
