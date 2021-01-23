package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Guardia;
import com.backend.backend.models._GuardiaI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class _GuardiaSI implements _GuardiaS {

    @Autowired
    private _GuardiaI repositoryGuardia;

    @Autowired
    private _UserS serviceUser;

    @Override
    public List<_Guardia> listGuardia() {
        return repositoryGuardia.findAll();
    }

    @Override
    public _Guardia newGuardia(Integer idProfesor, String inicio, String fin, String turno) {
        return repositoryGuardia.save(new _Guardia(inicio, fin, turno, serviceUser.getUserById(idProfesor)));
    }

    @Override
    public _Guardia updateGuardia(Integer id, String opcion, Object value) {
        _Guardia guardia = repositoryGuardia.findById(id).get();
        switch (opcion) {
            case "inicio":
                guardia.setInicio((String) value);
                break;
            case "fin":
                guardia.setFin((String) value);
                break;
            case "turno":
                guardia.setTurno((String) value);
                break;
            default:
                break;
        }
        return repositoryGuardia.save(guardia);
    }

    @Override
    public void deleteGuardia(Integer ids[]) {
        for (Integer id : ids) {
            repositoryGuardia.deleteById(id);
        }
    }
}
