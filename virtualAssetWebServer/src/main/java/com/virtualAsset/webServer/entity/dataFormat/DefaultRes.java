package com.virtualAsset.webServer.entity.dataFormat;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class DefaultRes<T> {

    private int statusCode;
    private String responseMessage;
    private T data;

    @Builder
    public DefaultRes(final int statusCode, final String responseMessage) {
        this.statusCode = statusCode;
        this.responseMessage = responseMessage;
        this.data = null;
    }
    
}