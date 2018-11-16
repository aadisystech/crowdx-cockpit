package com.exchange.cockpit.dao.impl;

import com.exchange.cockpit.dao.OrderDAO;
import com.exchange.cockpit.entity.Execution;
import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.OrderFilter;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDAOImpl implements OrderDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Transactional
    @Override
    public List<Order> getOrders(OrderFilter orderFilter) {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Order> criteria = cb.createQuery(Order.class);
        Root<Order> r = criteria.from(Order.class);
        List<Predicate> lp = getPredicates(orderFilter, cb, r);
        criteria.select(r).where(cb.and(lp.toArray(new Predicate[lp.size()])));
        Query q = session.createQuery(criteria);
        System.out.println("orderFilter.getFirstResult() " + orderFilter.getFirstResult());
        System.out.println("Integer.valueOf(orderFilter.getPageSize()) " + Integer.valueOf(orderFilter.getPageSize()));
        q.setFirstResult(orderFilter.getFirstResult());
        q.setMaxResults(Integer.valueOf(orderFilter.getPageSize()));
        return q.getResultList();
    }

    @Transactional
    public Long getOrdersTotalCount(OrderFilter orderFilter) {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Long> criteria = cb.createQuery(Long.class);
        Root<Order> r = criteria.from(Order.class);
        List<Predicate> lp = getPredicates(orderFilter, cb, r);
        criteria.select(cb.count(r.get("id"))).where(cb.and(lp.toArray(new Predicate[lp.size()])));
        Query q = session.createQuery(criteria);
        return (Long)q.getSingleResult();
    }

    @Override
    @Transactional
    public Order getOrderById(String orderId) {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Order> criteria = cb.createQuery(Order.class);
        Root<Order> r = criteria.from(Order.class);
        criteria.select(r).where(cb.equal(r.get("id"), orderId));
        Query q = session.createQuery(criteria);
        return (Order) q.getSingleResult();
    }

    private List<Predicate> getPredicates(OrderFilter orderFilter, CriteriaBuilder cb, Root<Order> r) {
        List<Predicate> lp = new ArrayList<>();
        int i = 0;
        if (orderFilter != null) {
            System.out.println("orderFilter.getOrderId() " + orderFilter.getOrderId());
            if (orderFilter.getOrderId() != null) {
                lp.add(cb.equal(r.get("id"), orderFilter.getOrderId()));
            }
            if (orderFilter.getClientId() != null) {
                lp.add(cb.equal(r.get("clientId"), orderFilter.getClientId()));
            }
            if (orderFilter.getSide() != null) {
                lp.add(cb.equal(r.get("side"), orderFilter.getSide()));
            }
            if (orderFilter.getType() != null) {
                lp.add(cb.equal(r.get("type"), orderFilter.getType()));
            }
            if (orderFilter.getStatus() != null) {
                lp.add(cb.equal(r.get("status"), orderFilter.getStatus()));
            }
            if (orderFilter.getSecurityId() != null) {
                lp.add(cb.equal(r.get("securityId"), orderFilter.getSecurityId()));
            }
            if (orderFilter.getEntryDateFrom() != null && orderFilter.getEntryDateTo() != null) {
                lp.add(cb.greaterThanOrEqualTo(r.get("recCreateTime"), orderFilter.getEntryDateFrom()));
                lp.add(cb.lessThanOrEqualTo(r.get("recCreateTime"), orderFilter.getEntryDateTo()));

            }
        }
        return lp;
    }
}
