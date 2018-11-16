package com.exchange.cockpit.dao.impl;

import com.exchange.cockpit.dao.ExecutionDAO;
import com.exchange.cockpit.entity.Execution;
import com.exchange.cockpit.entity.Order;
import com.exchange.cockpit.pojo.ExecutionFilter;
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
public class ExecutionDAOImpl implements ExecutionDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Transactional
    @Override
    public List<Execution> getExecutionsFromOrderId(String orderId) {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Execution> criteria = cb.createQuery(Execution.class);
        Root<Execution> r = criteria.from(Execution.class);
        //List<Predicate> lp = getPredicates(executionFilter, cb, r);
        criteria.select(r).where(cb.equal(r.get("orderId"), orderId));
        Query q = session.createQuery(criteria);
        return q.getResultList();
    }

    @Override
    @Transactional
    public List<Execution> getExecutions(ExecutionFilter executionFilter) {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Execution> criteria = cb.createQuery(Execution.class);
        Root<Execution> r = criteria.from(Execution.class);
        List<Predicate> lp = getPredicates(executionFilter, cb, r);
        criteria.select(r).where(cb.and(lp.toArray(new Predicate[lp.size()])));
        Query q = session.createQuery(criteria);
        System.out.println("executionFilter.getFirstResult() " + executionFilter.getFirstResult());
        System.out.println("Integer.valueOf(executionFilter.getPageSize()) " + Integer.valueOf(executionFilter.getPageSize()));
        q.setFirstResult(executionFilter.getFirstResult());
        q.setMaxResults(Integer.valueOf(executionFilter.getPageSize()));
        return q.getResultList();
    }

    @Override
    @Transactional
    public Long getExecutionsTotalCount(ExecutionFilter executionFilter) {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Long> criteria = cb.createQuery(Long.class);
        Root<Execution> r = criteria.from(Execution.class);
        List<Predicate> lp = getPredicates(executionFilter, cb, r);
        criteria.select(cb.count(r.get("executionId"))).where(cb.and(lp.toArray(new Predicate[lp.size()])));
        Query q = session.createQuery(criteria);
        return (Long)q.getSingleResult();
    }

    private List<Predicate> getPredicates(ExecutionFilter executionFilter, CriteriaBuilder cb, Root<Execution> r) {
        List<Predicate> lp = new ArrayList<>();
        if (executionFilter != null) {
            System.out.println("executionFilter.getOrderId() " + executionFilter.getOrderId());
            if (executionFilter.getOrderId() != null) {
                lp.add(cb.equal(r.get("orderId"), executionFilter.getOrderId()));
            }
            if (executionFilter.getExecutionId() != null) {
                lp.add(cb.equal(r.get("executionId"), executionFilter.getExecutionId()));
            }
            if (executionFilter.getType() != null) {
                lp.add(cb.equal(r.get("execType"), executionFilter.getType()));
            }
            if (executionFilter.getCreateDateFrom() != null && executionFilter.getCreateDateTo() != null) {
                lp.add(cb.greaterThanOrEqualTo(r.get("recCreateTime"), executionFilter.getCreateDateFrom()));
                lp.add(cb.lessThanOrEqualTo(r.get("recCreateTime"), executionFilter.getCreateDateTo()));
            }
        }
        return lp;
    }
}
