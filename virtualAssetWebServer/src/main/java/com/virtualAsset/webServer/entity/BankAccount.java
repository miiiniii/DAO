package com.virtualAsset.webServer.entity;

import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class BankAccount {
	private String bankName;
	private String accountNumber;

	public BankAccount(String bankName, String accountNumber) {
		super();
		this.bankName = bankName;
		this.accountNumber = accountNumber;
	}

	public String getAssetId() {
		return bankName;
	}

	public String getName() {
		return accountNumber;
	}

	public JSONObject toJsonObject() throws JSONException {
		JSONObject temp = new JSONObject();
		temp.put("bankName", bankName);
		temp.put("accountNumber", accountNumber);
		return temp;
	}
}
