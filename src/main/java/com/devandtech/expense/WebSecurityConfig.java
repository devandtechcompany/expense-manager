/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.devandtech.expense;

/**
 *
 * @author developer
 */
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    
        public static final String[] WHITELIST = {
            "/env",
            "/register",
            "/group/form",
            "/api/**",
            "/webjars/**",
            "/js/**",
            "/public/**",
            "/fonts/**",
            "/css/**",
            "/",
            "/login*"
        };

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		  http
                                // ...
                                .authorizeHttpRequests(authorize -> authorize    
                                        .requestMatchers(WHITELIST).permitAll()
//                                        .requestMatchers("/resources/**", "/hello", "/home").permitAll()         
//                                        .requestMatchers("/admin/**").hasRole("ADMIN")                             
                                        //.requestMatchers("/db/**").access(new WebExpressionAuthorizationManager("hasRole('ADMIN') and hasRole('DBA')"))   
                                        // .requestMatchers("/db/**").access(AuthorizationManagers.allOf(AuthorityAuthorizationManager.hasRole("ADMIN"), AuthorityAuthorizationManager.hasRole("DBA")))   
                                        .anyRequest().denyAll()                                                
                                )
                        //.formLogin(withDefaults());
                        .formLogin((form) -> form
				.loginPage("/login")
				.permitAll()
			)
			.logout((logout) -> logout.permitAll());
                        ;

		return http.build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		UserDetails user = User.withDefaultPasswordEncoder()
				.username("jarg")
				.password("jarg123")
				.roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
}