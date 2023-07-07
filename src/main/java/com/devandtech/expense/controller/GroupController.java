package com.devandtech.expense.controller;

import com.devandtech.expense.dto.GroupDTO;
import java.util.Date;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author developer
 */
@Controller
@RequestMapping("/group")
public class GroupController {
    
    static final String PATH = "group";
    
    @ModelAttribute("path")
    public String section() {
      return PATH;
    }
    
    @ModelAttribute("group")
    public GroupDTO groupDTO(){
        
        return new GroupDTO(1, "Grupo 1",  "Description Group 1");
    }
    
    @GetMapping("/form")
    public String form(){            
        return "group/form";
    }
    
    @PostMapping("/form")
    public String submit(){
        return "group/form";
    }
    
}
