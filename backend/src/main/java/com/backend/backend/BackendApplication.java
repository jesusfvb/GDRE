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
		// serviceUser.newAuthority(0, "DEFAULT", "Permiso que se le añade a todos los	Usuarios al Crearlos");
		// serviceUser.newAuthority(1, "ESTUDIANTE", "Permiso que se le añade a todos los Estudiantes al Crearlos");
		// serviceUser.newAuthority(2, "PROFESOR", "Permiso que se le añade a todos los Profesores al Crearlos");
		// serviceUser.newAuthority(3, "DIRECTOR", "Permiso que se le añade a todos los Directores al Crearlos");
		// serviceUser.newAuthority(4, "DECANO", "Permiso que se le añade a todos los Decanos al Crearlos");
		// serviceUser.newUser("Administrador", "Administrador", "admin", "1234");
	}
}
