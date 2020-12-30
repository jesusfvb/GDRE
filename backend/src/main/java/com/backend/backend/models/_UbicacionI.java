package com.backend.backend.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface _UbicacionI extends JpaRepository<_Ubicacion, Integer> {

    @Query("SELECT u FROM _Ubicacion u ORDER BY u.name")
    List<_Ubicacion> allUbicacionOrderByName();

    @Query(value = "SELECT u.* FROM _ubicacion u JOIN _ubicacion_rooms ur ON u.id = ur._ubicacion_id JOIN _cuarto_people cp ON ur.rooms_id=  cp._cuarto_id WHERE cp.people_id = ?1", nativeQuery = true)
    _Ubicacion findByPeopleId(Integer id);
}
