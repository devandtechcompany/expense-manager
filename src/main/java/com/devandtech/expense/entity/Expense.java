package com.devandtech.expense.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 *
 * @author developer
 */
@Data
@Entity
@Table(name="em_expense")
public class Expense  extends AuditEntity {
    
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public long id;
    
    String name;
    
    BigDecimal value;
    
    Date buyDate;
    
    Date useDate;
    
    String description;
    
    @ManyToOne
    Group group;
    
    @ManyToOne(optional = true)
    Category category;
    
}
