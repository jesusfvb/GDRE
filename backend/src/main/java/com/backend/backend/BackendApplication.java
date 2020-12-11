package com.backend.backend;

import com.backend.backend.services._UserS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private _UserS serviceUser;

	@Override
	public void run(String... args) throws Exception {
		serviceUser.createAuthorityAndUserAdmin();
	}
}
