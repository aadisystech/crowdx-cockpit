package com.exchange.cockpit.service.impl;

import com.exchange.cockpit.dao.ExecutionDAO;
import com.exchange.cockpit.entity.Execution;
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

    public String getExecutionsFromOrderId(String orderId) {
        List<Execution> execList = executionDAO.getExecutionsFromOrderId(orderId);
        return jsonConverter.buildJSONStringFromList(execList);
    }


}
