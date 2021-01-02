package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Authority;
import com.backend.backend.models._AuthorityI;
import com.backend.backend.models._User;
import com.backend.backend.models._UserI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class _UserSI implements _UserS {

    @Autowired
    private PasswordEncoder passwordEncoder;

    // All method of Authority
    @Autowired
    private _AuthorityI repositoryAuthority;

    @Override
    public List<_Authority> listAuthorityNoIsUserId(Integer id) {
        return repositoryAuthority.listAuthorsNoIsUserId(id);
    }

    @Override
    public void addAuthorityOnUser(Integer idUser, Integer idAuthority) {
        _User user = repositoryUser.findById(idUser).get();
        user.getAuthorities().add(repositoryAuthority.findById(idAuthority).get());
        repositoryUser.save(user);
    }

    @Override
    public void removeAuthorityOnUser(Integer idUser, Integer idAuthority) {
        _User user = repositoryUser.findById(idUser).get();
        user.getAuthorities().removeIf(authority -> authority.getId() == idAuthority);
        repositoryUser.save(user);
    }

    // All method of Users
    @Autowired
    private _UserI repositoryUser;

    @Override
    public _User getUserByUserName(String userName) {
        return repositoryUser.getUserByUserName(userName);
    }

    @Override
    public _User getUserById(Integer id) {
        return repositoryUser.findById(id).get();
    }

    @Override
    public List<_User> newUser(String name, String identification, String userName, String password) {
        _Authority authority = repositoryAuthority.findById(0).get();
        _User user = new _User(name, identification, userName, passwordEncoder.encode(password));
        user.getAuthorities().add(authority);
        repositoryUser.save(user);
        return repositoryUser.getAllUsersOrderByName();
    }

    @Override
    public List<_User> listUser() {
        return repositoryUser.getAllUsersOrderByName();
    }

    @Override
    public List<_User> deleteUser(Integer ids[]) {
        for (Integer i : ids) {
            repositoryUser.deleteById(i);
        }
        return repositoryUser.getAllUsersOrderByName();
    }

    @Override
    public List<_User> updateUser(Integer id, String opcion, Object value) {
        _User user = repositoryUser.findById(id).get();
        switch (opcion) {
            case "name":
                user.setName((String) value);
                break;
            case "userName":
                user.setUserName((String) value);
                break;
            case "identification":
                user.setIdentification((String) value);
                break;
        }
        repositoryUser.save(user);
        return repositoryUser.getAllUsersOrderByName();
    }

    // Método de inicio generar que crea los permisos y el user admin
    @Override
    public void createAuthorityAndUserAdmin() {
        // Permisos
        if (repositoryAuthority.count() != 24)
            repositoryAuthority
                    .save(new _Authority(0, "USER", "Permiso que se le añade a todos los Usuarios al Crearlos"));
        repositoryAuthority.save(new _Authority(1, "ADMINISTRADOR", "Permite controlar la aplicación en su totalidad"));
        // Usuarios
        repositoryAuthority
                .save(new _Authority(2, "GESTION-USUARIOS", "Permite gestionar a los usuarios en su totalidad"));
        repositoryAuthority.save(new _Authority(3, "MODIFICAR-USUARIOS", "Permite solamente modificar los usuarios"));
        repositoryAuthority.save(new _Authority(4, "BORRAR-USUARIOS", "Permite solamente borrar los usuarios"));
        repositoryAuthority.save(new _Authority(5, "AÑADIR-USUARIOS", "Permite solamente añadir usuarios"));
        repositoryAuthority.save(new _Authority(6, "DAR-PERMISO-USUARIOS",
                "Permite solamente dar y quitar los permisos a los usuarios"));
        // Ubicacion
        repositoryAuthority.save(new _Authority(7, "GESTION-UBICACION-CUARTOS-PERSONAS",
                "Permite gestionar las Ubicaciones,los Cuartos y las Personas en su totalidad"));
        repositoryAuthority
                .save(new _Authority(8, "GESTION-UBICACION", "Permite gestionar las Ubicaciones en su totalidad"));
        repositoryAuthority.save(new _Authority(9, "AÑADIR-UBICACION", "Permite añadir las Ubicaciones"));
        repositoryAuthority.save(new _Authority(10, "MODIFICAR-UBICACION", "Permite modificar las Ubicaciones"));
        repositoryAuthority.save(new _Authority(11, "BORRAR-UBICACION", "Permite borrar las Ubicaciones"));
        repositoryAuthority.save(new _Authority(12, "GESTION-CUARTO", "Permite gestionar los Cuartos en su totalidad"));
        repositoryAuthority.save(new _Authority(13, "AÑADIR-CUARTO", "Permite añadir los Cuartos"));
        repositoryAuthority.save(new _Authority(14, "MODIFICAR-CUARTO", "Permite modificar los Cuartos"));
        repositoryAuthority.save(new _Authority(15, "BORRAR-CUARTO", "Permite borrar los Cuartos"));
        repositoryAuthority.save(new _Authority(16, "GESTION-PERSONAS",
                "Permite gestionar las Personas de los Cuartos en su totalidad"));
        repositoryAuthority.save(new _Authority(17, "AÑADIR-PERSONAS", "Permite añadir las Personas de los Cuartos"));
        repositoryAuthority
                .save(new _Authority(18, "BORRAR-PERSONAS", "Permite modificar las Personas de los Cuartos"));
        repositoryAuthority
                .save(new _Authority(19, "GESTION-CUARTELERIA", "Permite gestionar las Cuartelarías en su totalidad"));
        repositoryAuthority.save(new _Authority(20, "AÑADIR-CUARTELERIA", "Permite añadir las Cuartelarías"));
        repositoryAuthority.save(new _Authority(21, "MODIFICAR-CUARTELERIA", "Permite modificar las Cuartelarías"));
        repositoryAuthority.save(new _Authority(22, "BORRAR-CUARTELERIA", "Permite borrar las Cuartelarías"));
        repositoryAuthority.save(new _Authority(23, "GESTION-INCIDENCIA", "Permite gestionar las incidencias"));
        // Add user Administrador
        if (!repositoryUser.existsById(1)) {
            _User admin = new _User(0, "Administrador", "Administrador", "admin", passwordEncoder.encode("1234"));
            admin.getAuthorities().add(repositoryAuthority.findById(0).get());
            admin.getAuthorities().add(repositoryAuthority.findById(1).get());
            repositoryUser.save(admin);
        }

    }
}
