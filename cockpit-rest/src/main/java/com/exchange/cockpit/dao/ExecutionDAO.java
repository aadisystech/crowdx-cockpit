package com.exchange.cockpit.dao;

import com.exchange.cockpit.entity.Execution;
import com.exchange.cockpit.pojo.ExecutionFilter;

import java.util.List;

public interface ExecutionDAO {

    List<Execution> getExecutionsFromOrderId(String orderId);

    List<Execution> getExecutions(ExecutionFilter executionFilter);

    Long getExecutionsTotalCount(ExecutionFilter executionFilter);
}
