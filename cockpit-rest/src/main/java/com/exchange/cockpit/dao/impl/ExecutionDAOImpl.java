package com.exchange.cockpit.dao.impl;

import com.exchange.cockpit.dao.ExecutionDAO;
import com.exchange.cockpit.entity.Execution;
import com.exchange.cockpit.entity.Order;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
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
        //List<Predicate> lp = getPredicates(orderFilter, cb, r);
        criteria.select(r).where(cb.equal(r.get("orderId"), orderId));
        Query q = session.createQuery(criteria);
        return q.getResultList();
    }
}
