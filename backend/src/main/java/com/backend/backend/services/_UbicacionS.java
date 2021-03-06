package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Cuarto;
import com.backend.backend.models._Ubicacion;
import com.backend.backend.models._User;

import org.springframework.stereotype.Service;

@Service
public interface _UbicacionS {

    public List<_Ubicacion> listUbicacion();

    public List<_Ubicacion> newUbicacion(String name, Integer numberOfRooms);

    public List<_Ubicacion> deleteUbicacion(Integer ids[]);

    public List<_Ubicacion> updateUbicacion(Integer id, String opcion, Object value);

    public _Ubicacion getUbicacionForIdPersona(Integer id);

    public _Cuarto newCuarto(Integer numero, Integer numberOfPeople, Integer idUbicacion);

    public void deleteRooms(Integer idUbicacion, Integer[] ids);

    public _Cuarto updateCuarto(Integer id, String opcion, Object value);

    public _User addUserForCuarto(Integer idCuarto, Integer idUser);

    public void deletePeople(Integer idCuarto, Integer[] idPeople);
}
