package com.exchange.cockpit.service.impl;

import com.exchange.cockpit.dao.ExecutionDAO;
import com.exchange.cockpit.entity.Execution;
import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.ExecutionFilter;
import com.exchange.cockpit.pojo.OrderFilter;
import com.exchange.cockpit.service.ExecutionService;
import com.exchange.cockpit.util.JSONConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExecutionServiceImpl implements ExecutionService {

    @Autowired
    private ExecutionDAO executionDAO;

    @Autowired
    JSONConverter jsonConverter;

    @Override
    public String getExecutions(String filter) {
        ExecutionFilter of = null;
        if (filter != null && !filter.equals("")) {
            of = jsonConverter.buildExecutionFilterFromJSONString(filter);
        }
        System.out.println("of " + of);
        List<Execution> o = executionDAO.getExecutions(of);
        System.out.println(o);
        return jsonConverter.buildJSONStringFromList(o);
    }

    @Override
    public Long getExecutionsTotalCount(String filter) {
        ExecutionFilter of = null;
        if (filter != null && !filter.equals("")) {
            of = jsonConverter.buildExecutionFilterFromJSONString(filter);
        }
        System.out.println("of " + of);
        Long o = executionDAO.getExecutionsTotalCount(of);
        System.out.println(o);
        return o;
    }

    public String getExecutionsFromOrderId(String orderId) {
        List<Execution> execList = executionDAO.getExecutionsFromOrderId(orderId);
        return jsonConverter.buildJSONStringFromList(execList);
    }


}
