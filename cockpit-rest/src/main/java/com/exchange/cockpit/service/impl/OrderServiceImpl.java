package com.exchange.cockpit.service.impl;

import com.exchange.cockpit.dao.OrderDAO;
import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.OrderFilter;
import com.exchange.cockpit.service.OrderService;
import com.exchange.cockpit.util.JSONConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDAO orderDAO;

    @Autowired
    JSONConverter jsonConverter;

    public String getOrders(String filter) {
        OrderFilter of = null;
        if (filter != null && !filter.equals("")) {
            of = jsonConverter.buildOrderFilterFromJSONString(filter);
        }
        System.out.println("of " + of);
        List<Order> o = orderDAO.getOrders(of);
        System.out.println(o);
        return jsonConverter.buildJSONStringFromList(o);
    }

    public Long getOrdersTotalCount(String filter) {
        OrderFilter of = null;
        if (filter != null && !filter.equals("")) {
            of = jsonConverter.buildOrderFilterFromJSONString(filter);
        }
        System.out.println("of " + of);
        Long o = orderDAO.getOrdersTotalCount(of);
        System.out.println(o);
        return o;
    }
}
