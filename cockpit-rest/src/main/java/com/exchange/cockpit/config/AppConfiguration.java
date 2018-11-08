package com.exchange.cockpit.config;

import com.exchange.cockpit.util.JSONConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    @Bean("jsonConverter")
    public JSONConverter getJSONConverter() {
        return new JSONConverter();
    }
}
