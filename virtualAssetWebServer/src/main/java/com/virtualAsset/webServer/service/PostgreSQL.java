package com.virtualAsset.webServer.service;



import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class PostgreSQL{
    @Autowired
    DataSource dataSource;

    @Autowired
    JdbcTemplate jdbcTemplate;
    
}