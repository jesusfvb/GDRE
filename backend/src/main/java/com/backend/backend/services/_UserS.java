package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Authority;
import com.backend.backend.models._User;

import org.springframework.stereotype.Service;

@Service
public interface _UserS {
    // All options of User
    public _User getUserByUserName(String userName);

    public List<_User> newUser(String name, String identification, String userName, String password);

    public List<_User> listUser();

    public List<_User> deleteUser(Integer ids[]);

    public List<_User> updateUser(Integer id, String opcion, Object value);

    // All options of Authority
    public void newAuthority(Integer id, String value, String description);

    public List<_Authority> listAuthorityNoIsUserId(Integer id);

    public void addAuthorityOnUser(Integer idUser, Integer idAuthority);

    public void removeAuthorityOnUser(Integer idUser, Integer idAuthority);
}
