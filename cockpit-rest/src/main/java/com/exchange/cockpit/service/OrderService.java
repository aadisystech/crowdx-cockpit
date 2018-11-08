package com.exchange.cockpit.service;

public interface OrderService {

    String getOrders(String filter);

    Long getOrdersTotalCount(String filter);
}
