package com.devandtech.expense;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author developer
 */
@Configuration
@ConfigurationProperties("app")
@Data
public class AppEnviroment {
    
    private String env;
        
}
