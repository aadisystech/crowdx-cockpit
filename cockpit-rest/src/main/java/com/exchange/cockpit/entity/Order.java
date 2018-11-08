package com.exchange.cockpit.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "orders", schema = "quickfix")
public class Order {

    @Id
    @Column(name = "order_id", nullable = false)
    private String id;

    @Column(name = "order_side", nullable = false)
    private String side;

    @Column(name = "order_type")
    private String type;

    @Column(name = "order_tif")
    private String tif;

    @Column(name = "order_status")
    private String status;

    @Column(name = "order_client_id")
    private String clientId;

    @Column(name = "order_orig_client_id")
    private String origClientId;

    @Column(name = "order_symbol")
    private String symbol;

    @Column(name = "order_security_id")
    private String securityId;

    @Column(name = "order_idsource")
    private String idSource;

    @Column(name = "order_quantity")
    private BigDecimal quantity;

    @Column(name = "order_open_quantity")
    private BigDecimal openQuantity;

    @Column(name = "order_executed_quantity")
    private BigDecimal executedQuantity;

    @Column(name = "order_limit_price")
    private BigDecimal limitPrice;

    @Column(name = "order_avg_price")
    private BigDecimal avgPrice;

    @Column(name = "order_rec_create_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:SS")
    private Timestamp recCreateTime;

    @Column(name = "order_rec_update_time")
    private Timestamp recUpdateTime;

    public Order() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getTif() {
        return tif;
    }

    public void setTif(String tif) {
        this.tif = tif;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getOrigClientId() {
        return origClientId;
    }

    public void setOrigClientId(String origClientId) {
        this.origClientId = origClientId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getSecurityId() {
        return securityId;
    }

    public void setSecurityId(String securityId) {
        this.securityId = securityId;
    }

    public String getIdSource() {
        return idSource;
    }

    public void setIdSource(String idSource) {
        this.idSource = idSource;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getOpenQuantity() {
        return openQuantity;
    }

    public void setOpenQuantity(BigDecimal openQuantity) {
        this.openQuantity = openQuantity;
    }

    public BigDecimal getExecutedQuantity() {
        return executedQuantity;
    }

    public void setExecutedQuantity(BigDecimal executedQuantity) {
        this.executedQuantity = executedQuantity;
    }

    public BigDecimal getLimitPrice() {
        return limitPrice;
    }

    public void setLimitPrice(BigDecimal limitPrice) {
        this.limitPrice = limitPrice;
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

    public Timestamp getRecUpdateTime() {
        return recUpdateTime;
    }

    public void setRecUpdateTime(Timestamp recUpdateTime) {
        this.recUpdateTime = recUpdateTime;
    }
}
