package com.devandtech.expense.dto;

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
public class CategoryDTO {
    
    public long id;
    
    String name;
    
    String description;
    
}
