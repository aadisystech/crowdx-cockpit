package com.exchange.cockpit.service;

public interface ExecutionService {

    String getExecutions(String filter);

    Long getExecutionsTotalCount(String filter);

    String getExecutionsFromOrderId(String orderId);
}
