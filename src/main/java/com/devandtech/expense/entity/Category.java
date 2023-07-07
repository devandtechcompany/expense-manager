package com.devandtech.expense.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 *
 * @author developer
 */
@Data
@Entity
@Table(name="em_category")
public class Category  extends AuditEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public long id;
    
    String name;
    
    String description;
    
}
