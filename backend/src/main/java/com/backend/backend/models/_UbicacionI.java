package com.backend.backend.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface _UbicacionI extends JpaRepository<_Ubicacion, Integer> {

    @Query("SELECT u FROM _Ubicacion u ORDER BY u.name")
    List<_Ubicacion> allUbicacionOrderByName();

}
