package com.devandtech.expense.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.Data;

/**
 *
 * @author developer
 */
@Data
@Entity
@Table(name="em_group")
public class Group extends AuditEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    long id;
    
    String name;
    
    String description;
}
