package com.exchange.cockpit.pojo;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExecutionFilter {

    private String orderId;
    private String executionId;
    private String type;
    private String createDateFrom;
    private String createDateTo;
    private String pageCount;
    private String pageSize;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getExecutionId() {
        return executionId;
    }

    public void setExecutionId(String executionId) {
        this.executionId = executionId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCreateDateFromStr() {
        return createDateFrom;
    }

    public void setCreateDateFrom(String createDateFrom) {
        this.createDateFrom = createDateFrom;
    }

    public String getCreateDateToStr() {
        return createDateTo;
    }

    public void setCreateDateTo(String createDateTo) {
        this.createDateTo = createDateTo;
    }

    public String getPageCount() {
        return pageCount;
    }

    public void setPageCount(String pageCount) {
        this.pageCount = pageCount;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }
    public Date getCreateDateFrom() {
        if (this.getCreateDateFromStr() == null) {
            return null;
        }
        Date parsedDate = null;
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
        try {
            parsedDate = formatter.parse(this.getCreateDateFromStr());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parsedDate;
    }

    public Date getCreateDateTo() {
        if (this.getCreateDateToStr() == null) {
            return null;
        }
        Date parsedDate = null;
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
        try {
            parsedDate = formatter.parse(this.getCreateDateToStr());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parsedDate;
    }

    public int getFirstResult() {
        return (Integer.valueOf(this.pageCount) - 1) * Integer.valueOf(this.pageSize);
    }
}
