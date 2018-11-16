package com.exchange.cockpit.pojo;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class OrderFilter {

    private String orderId;
    private String clientId;
    private String side;
    private String type;
    private String status;
    private String securityId;
    private String entryDateFrom;
    private String entryDateTo;
    private String pageCount;
    private String pageSize;

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

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSecurityId() {
        return securityId;
    }

    public void setSecurityId(String securityId) {
        this.securityId = securityId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    private static Date asDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    }

    public int getFirstResult() {
        return (Integer.valueOf(this.pageCount) - 1) * Integer.valueOf(this.pageSize);
    }

    public String getEntryDateFromStr() {
        return entryDateFrom;
    }

    public Date getEntryDateFrom() {
        if (this.getEntryDateFromStr() == null) {
            return null;
        }
        Date parsedDate = null;
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
        try {
            parsedDate = formatter.parse(this.getEntryDateFromStr());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parsedDate;
    }

    public Date getEntryDateTo() {
        if (this.getEntryDateToStr() == null) {
            return null;
        }
        Date parsedDate = null;
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
        try {
            parsedDate = formatter.parse(this.getEntryDateToStr());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parsedDate;
    }

    public void setEntryDateFrom(String entryDateFrom) {
        this.entryDateFrom = entryDateFrom;
    }

    public String getEntryDateToStr() {
        return entryDateTo;
    }

    public void setEntryDateTo(String entryDateTo) {
        this.entryDateTo = entryDateTo;
    }

}
