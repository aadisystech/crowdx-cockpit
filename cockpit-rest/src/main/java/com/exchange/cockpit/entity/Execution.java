package com.exchange.cockpit.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "executions", schema = "quickfix")
public class Execution implements Serializable {

    @Id
    @Column(name="exe_exec_id")
    private String executionId;

    @Column(name="exe_order_id")
    private String orderId;

    @Column(name="exe_exec_type")
    private String execType;

    @Column(name="exe_tran_type")
    private String execTranType;

    @Column(name="exe_last_shares")
    private BigDecimal lastShares;

    @Column(name="exe_last_price")
    private BigDecimal lastPrice;

    @Column(name="exe_leaves_quantity")
    private BigDecimal leavesQuantity;

    @Column(name="exe_cum_quantity")
    private BigDecimal cumQuantity;

    @Column(name="exe_avg_price")
    private BigDecimal avgPrice;

    @Column(name="exe_rec_create_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:SS")
    private Timestamp recCreateTime;

//    @ManyToOne
//    @JoinColumn(name = "exe_order_id", nullable = false, insertable = false, updatable = false)
//    @JsonBackReference
//    private Order order;

    public Execution() {

    }

    public String getExecutionId() {
        return executionId;
    }

    public void setExecutionId(String executionId) {
        this.executionId = executionId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getExecType() {
        return execType;
    }

    public void setExecType(String execType) {
        this.execType = execType;
    }

    public String getExecTranType() {
        return execTranType;
    }

    public void setExecTranType(String execTranType) {
        this.execTranType = execTranType;
    }

    public BigDecimal getLastShares() {
        return lastShares;
    }

    public void setLastShares(BigDecimal lastShares) {
        this.lastShares = lastShares;
    }

    public BigDecimal getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(BigDecimal lastPrice) {
        this.lastPrice = lastPrice;
    }

    public BigDecimal getLeavesQuantity() {
        return leavesQuantity;
    }

    public void setLeavesQuantity(BigDecimal leavesQuantity) {
        this.leavesQuantity = leavesQuantity;
    }

    public BigDecimal getCumQuantity() {
        return cumQuantity;
    }

    public void setCumQuantity(BigDecimal cumQuantity) {
        this.cumQuantity = cumQuantity;
    }

    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }

    public Timestamp getRecCreateTime() {
        return recCreateTime;
    }

    public void setRecCreateTime(Timestamp recCreateTime) {
        this.recCreateTime = recCreateTime;
    }

//    public Order getOrder() {
//        return order;
//    }
//
//    public void setOrder(Order order) {
//        this.order = order;
//    }
}
