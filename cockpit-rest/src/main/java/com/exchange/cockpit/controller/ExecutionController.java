package com.exchange.cockpit.controller;

import com.exchange.cockpit.service.ExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExecutionController {

    @Autowired
    private ExecutionService executionService;

    @GetMapping("/api/executions/orderid/{orderId}")
    public String getExecutionsFromOrderId(@PathVariable String orderId) {
        System.out.println("Inside execustiosn orderId " + orderId);
        return executionService.getExecutionsFromOrderId(orderId);
    }
}
