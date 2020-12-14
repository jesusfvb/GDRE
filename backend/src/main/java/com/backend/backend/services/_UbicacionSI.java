package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Ubicacion;
import com.backend.backend.models._UbicacionI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class _UbicacionSI implements _UbicacionS {

    @Autowired
    private _UbicacionI repositoryUbicacion;

    @Override
    public List<_Ubicacion> listUbicacion() {
        return repositoryUbicacion.allUbicacionOrderByName();
    }

    @Override
    public List<_Ubicacion> newUbicacion(String name, Integer numberOfRooms) {
        repositoryUbicacion.save(new _Ubicacion(name, numberOfRooms));
        return repositoryUbicacion.allUbicacionOrderByName();
    }

    @Override
    public List<_Ubicacion> deleteUbicacion(Integer[] ids) {
        for (Integer i : ids) {
            repositoryUbicacion.deleteById(i);
        }
        return repositoryUbicacion.allUbicacionOrderByName();
    }

    @Override
    public List<_Ubicacion> updateUbicacion(Integer id, String opcion, Object value) {
        _Ubicacion ubicacion = repositoryUbicacion.findById(id).get();
        switch (opcion) {
            case "nameUbicacion":
                ubicacion.setName((String) value);
                break;
            case "numberOfRooms":
                ubicacion.setNumberOfRooms(Integer.parseInt((String) value));
                break;
        }
        repositoryUbicacion.save(ubicacion);
        return repositoryUbicacion.allUbicacionOrderByName();
    }

}
