package com.backend.backend.services;

import java.util.Arrays;
import java.util.List;

import com.backend.backend.models._Cuarto;
import com.backend.backend.models._CuartoI;
import com.backend.backend.models._Ubicacion;
import com.backend.backend.models._UbicacionI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class _UbicacionSI implements _UbicacionS {

    @Autowired
    private _UbicacionI repositoryUbicacion;

    @Autowired
    private _CuartoI repositoryCuarto;

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

    @Override
    public _Cuarto newCuarto(Integer numero, Integer numberOfPeople, Integer idUbicacion) {
        _Cuarto cuarto = repositoryCuarto.save(new _Cuarto(numero, numberOfPeople));
        _Ubicacion ubicacion = repositoryUbicacion.findById(idUbicacion).get();
        ubicacion.getRooms().add(cuarto);
        repositoryUbicacion.save(ubicacion);
        return cuarto;
    }

    @Override
    public void deleteRooms(Integer idUbicacion, Integer[] ids) {
        List<_Cuarto> cuartos = repositoryCuarto.findAllById(Arrays.asList(ids));
        _Ubicacion ubicacion = repositoryUbicacion.findById(idUbicacion).get();
        ubicacion.getRooms().removeAll(cuartos);
        repositoryUbicacion.save(ubicacion);
        repositoryCuarto.deleteAll(cuartos);
    }

    @Override
    public _Cuarto updateCuarto(Integer id, String opcion, Object value) {
        _Cuarto room = repositoryCuarto.findById(id).get();
        switch (opcion) {
            case "numero":
                room.setNumero(Integer.parseInt((String) value));
                break;
            case "numberOfPeople":
                room.setNumberOfPeople(Integer.parseInt((String) value));
                break;
        }
        repositoryCuarto.save(room);
        return room;
    }
}
