package com.exchange.cockpit.dao;

import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.OrderFilter;

import java.util.List;

public interface OrderDAO {

    List<Order> getOrders(OrderFilter orderFilter);

    Long getOrdersTotalCount(OrderFilter orderFilter);

    Order getOrderById(String orderId);
}
