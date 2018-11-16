package com.exchange.cockpit.controller;

import com.exchange.cockpit.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping(value="/api/orders")
    public String getOrders(@RequestParam(value = "filter", required = false) String filter) {
        System.out.println(filter);
        return orderService.getOrders(filter);
    }

    @GetMapping(value="/api/orders/totalcount")
    public Long getOrdersTotalCount(@RequestParam(value = "filter", required = false) String filter) {
        System.out.println(filter);
        return orderService.getOrdersTotalCount(filter);
    }

    @GetMapping("/api/orders/{orderId}")
    public String getOrder(@PathVariable String orderId) {
        System.out.println("Inside execustiosn orderId " + orderId);
        return orderService.getOrderFromId(orderId);
    }
}
