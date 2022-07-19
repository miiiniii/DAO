package com.virtualAsset.webServer.dataAccessObject;

import java.util.List;

import com.virtualAsset.webServer.entity.KafkaMSG;

public interface MsgRecordDAO {
	public List<KafkaMSG> selectAllMessages(String topic);
	public void insertMessage(KafkaMSG msg);
}
