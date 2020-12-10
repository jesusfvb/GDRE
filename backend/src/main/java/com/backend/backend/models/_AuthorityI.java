package com.backend.backend.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface _AuthorityI extends JpaRepository<_Authority, Integer> {

    @Query(value = "SELECT au.* FROM _authority au WHERE au.id NOT IN (SELECT usas.authorities_id FROM _user_authorities usas WHERE usas._user_id = ?1)", nativeQuery = true)
    List<_Authority> listAuthorsNoIsUserId(Integer id);

}
