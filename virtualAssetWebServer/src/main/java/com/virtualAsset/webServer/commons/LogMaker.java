package com.virtualAsset.webServer.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogMaker {
	private Logger logger;
	
	public LogMaker(Class logClass) {
		logger=LoggerFactory.getLogger(logClass);
	}
	public void info(
			) {
		
	}
	public void debug() {
		
	}
	public void warn() {
		
	}
	public void error() {
		
	}
	public void trace() {
		
	}
}
