package com.exchange.cockpit.dao;

import com.exchange.cockpit.entity.Execution;

import java.util.List;

public interface ExecutionDAO {

    List<Execution> getExecutionsFromOrderId(String orderId);
}
