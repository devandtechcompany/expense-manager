package com.devandtech.expense.dto;

import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author developer
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDTO {
    
    long id;
    
    String name;
    
    BigDecimal value;
    
    Date buyDate;
    
    Date useDate;
    
    String description;
    
}
