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
    public void newAuthority(Integer id, String value, String description) {
        repositoryAuthority.save(new _Authority(id, value, description));
    }

    // All method of Users
    @Autowired
    private _UserI repositoryUser;

    @Override
    public _User getUserByUserName(String userName) {
        return repositoryUser.getUserByUserName(userName);
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

}
