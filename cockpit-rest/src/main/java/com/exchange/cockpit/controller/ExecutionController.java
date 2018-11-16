package com.exchange.cockpit.controller;

import com.exchange.cockpit.service.ExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExecutionController {

    @Autowired
    private ExecutionService executionService;

    @GetMapping("/api/executions")
    public String getExecutions(@RequestParam(value = "filter", required = false) String filter) {
        return executionService.getExecutions(filter);
    }

    @GetMapping(value="/api/executions/totalcount")
    public Long getExecutionsTotalCount(@RequestParam(value = "filter", required = false) String filter) {
        System.out.println(filter);
        return executionService.getExecutionsTotalCount(filter);
    }

    @GetMapping("/api/executions/orderid/{orderId}")
    public String getExecutionsFromOrderId(@PathVariable String orderId) {
        System.out.println("Inside execustiosn orderId " + orderId);
        return executionService.getExecutionsFromOrderId(orderId);
    }
}
