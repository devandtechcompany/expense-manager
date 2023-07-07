package com.devandtech.expense.controller;

import com.devandtech.expense.AppEnviroment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author developer
 */
@Controller
@RequestMapping("/env")
public class EnviromentController {
    
    static final String PATH = "env";
    
    @Autowired
    AppEnviroment appEnviroment;
    
    @ModelAttribute("path")
    public String section() {
      return PATH;
    }       
    
    @GetMapping
    public String form(Model model){    
        model.addAttribute("app", appEnviroment);
        return "env/data";
    }
    
}
