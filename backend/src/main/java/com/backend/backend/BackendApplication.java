package com.backend.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	// @Autowired
	// private _UserS serviceUser;

	@Override
	public void run(String... args) throws Exception {
		// serviceUser.newAuthority(0, "DEFAULT", "Permiso que se le añade a todos los
		// Usuarios al Crearlos");
		// serviceUser.newUser("Administrador", "admin", "1234");
	}
}
