package com.firas.LoginAndRegistration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@SpringBootApplication
@ComponentScan(basePackages = "com.firas.LoginAndRegistration")
public class LoginAndRegistrationApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginAndRegistrationApplication.class, args);
	}

}
