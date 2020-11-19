package com.backend.backend.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface _UserI extends JpaRepository<_User, Integer> {

    @Query("SELECT u FROM _User u ORDER BY u.name")
    public List<_User> getAllUsersOrderByName();

    @Query("SELECT u FROM _User u WHERE u.userName =?1 ")
    public _User getUserByUserName(String userName);

}
