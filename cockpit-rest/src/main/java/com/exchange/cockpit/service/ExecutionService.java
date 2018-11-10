package com.exchange.cockpit.service;

import com.exchange.cockpit.entity.Execution;

import java.util.List;

public interface ExecutionService {

    String getExecutionsFromOrderId(String orderId);
}
