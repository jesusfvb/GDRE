package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Cuarteleria;
import com.backend.backend.models._CuarteleriaI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class _CuarteleriaSI implements _CuarteleriaS {

    @Autowired
    private _CuarteleriaI repositoryCuarteleria;

    @Autowired
    private _UbicacionS serviceUbicacion;

    @Autowired
    private _UserS serviceUser;

    @Override
    public List<_Cuarteleria> listCuarteleria() {
        return repositoryCuarteleria.findAll();
    }

    @Override
    public _Cuarteleria addCuarteleria(String fecha, Integer idPersona) {
        return repositoryCuarteleria
                .save(new _Cuarteleria(fecha, serviceUbicacion.getUbicacionForIdPersona(idPersona).getName(),
                        "No evaluado", serviceUser.getUserById(idPersona)));
    }

    @Override
    public void deleteCuarteleria(Integer[] ids) {
        for (Integer id : ids) {
            repositoryCuarteleria.deleteById(id);
        }
    }

    @Override
    public _Cuarteleria updateCuarteleria(Integer id, String opcion, Object value) {
        _Cuarteleria cuarteleria = repositoryCuarteleria.findById(id).get();
        switch (opcion) {
            case "evaluacion":
                cuarteleria.setEvaluacion((String) value);
                break;
            case "date":
                cuarteleria.setFecha((String) value);
                break;
            default:
                break;
        }
        repositoryCuarteleria.save(cuarteleria);
        return cuarteleria;
    }

}
