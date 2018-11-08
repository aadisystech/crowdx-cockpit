package com.exchange.cockpit.dao.impl;

import com.exchange.cockpit.dao.OrderDAO;
import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.OrderFilter;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDAOImpl implements OrderDAO {

    @Autowired
    SessionFactory sessionFactory;

    @Transactional
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

    private List<Predicate> getPredicates(OrderFilter orderFilter, CriteriaBuilder cb, Root<Order> r) {
        List<Predicate> lp = new ArrayList<>();
        int i = 0;
        if (orderFilter != null) {
            System.out.println("orderFilter.getOrderId() " + orderFilter.getOrderId());
            if (orderFilter.getOrderId() != null) {
                lp.add(cb.equal(r.get("id"), orderFilter.getOrderId()));
                //criteria.where(cb.equal(r.get("id"), orderFilter.getOrderId()));
            }
            if (orderFilter.getClientId() != null) {
                lp.add(cb.equal(r.get("clientId"), orderFilter.getClientId()));
                //criteria.where(cb.equal(r.get("clientId"), orderFilter.getClientId()));
            }
            if (orderFilter.getSide() != null) {
                lp.add(cb.equal(r.get("side"), orderFilter.getSide()));
                //criteria.where(cb.equal(r.get("side"), orderFilter.getSide()));
            }
            if (orderFilter.getType() != null) {
                lp.add(cb.equal(r.get("type"), orderFilter.getType()));
                //criteria.where(cb.equal(r.get("type"), orderFilter.getType()));
            }
            if (orderFilter.getStatus() != null) {
                lp.add(cb.equal(r.get("status"), orderFilter.getStatus()));
                //criteria.where(cb.equal(r.get("status"), orderFilter.getStatus()));
            }
            if (orderFilter.getSecurityId() != null) {
                lp.add(cb.equal(r.get("securityId"), orderFilter.getSecurityId()));
                //criteria.where(cb.equal(r.get("securityId"), orderFilter.getSecurityId()));
            }

            if (orderFilter.getEntryDateFrom() != null) {
                switch (orderFilter.getDateOperator()) {
                    case "eq":
                        lp.add(cb.greaterThanOrEqualTo(r.get("recCreateTime"), orderFilter.getSelectedEntryDateFrom()));
                        lp.add(cb.lessThan(r.get("recCreateTime"), orderFilter.getNextEntryDate(orderFilter.getEntryDateFrom())));
                        break;
                    case "le" :
                        lp.add(cb.lessThanOrEqualTo(r.get("recCreateTime"), orderFilter.getSelectedEntryDateFrom()));
                        break;
                    case "ge" :
                        lp.add(cb.greaterThanOrEqualTo(r.get("recCreateTime"), orderFilter.getSelectedEntryDateFrom()));
                        break;
                    case "bt" :
                        lp.add(cb.greaterThanOrEqualTo(r.get("recCreateTime"), orderFilter.getSelectedEntryDateFrom()));
                        lp.add(cb.lessThanOrEqualTo(r.get("recCreateTime"), orderFilter.getNextEntryDate(orderFilter.getEntryDateTo())));
                        break;
                }
            }
        }
        return lp;
    }
}
