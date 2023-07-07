package com.devandtech.expense.dto;

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
public class GroupDTO {
    
    long id;
    
    String name;
    
    String description;
    
}
