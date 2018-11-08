package com.exchange.cockpit.util;

import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.OrderFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;

public class JSONConverter {

    @Autowired
    ObjectMapper objectMapper;

    public OrderFilter buildOrderFilterFromJSONString(String strFilter) {
        OrderFilter filter = null;
        try {
            filter = objectMapper.readValue(strFilter, OrderFilter.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return filter;
    }

    public String buildJSONStringFromOrderList(List<Order> orders) {
        String jsonResponse = null;
        try {
            jsonResponse = objectMapper.writeValueAsString(orders);
        } catch(JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonResponse;
    }
}
