package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Ubicacion;

import org.springframework.stereotype.Service;

@Service
public interface _UbicacionS {

    public List<_Ubicacion> listUbicacion();

    public List<_Ubicacion> newUbicacion(String name, Integer numberOfRooms);

    public List<_Ubicacion> deleteUbicacion(Integer ids[]);

    public List<_Ubicacion> updateUbicacion(Integer id, String opcion, Object value);

}
