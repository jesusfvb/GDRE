package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Asistencia;
import com.backend.backend.models._AsistenciaI;
import com.backend.backend.models._Guardia;
import com.backend.backend.models._GuardiaI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class _GuardiaSI implements _GuardiaS {

    @Autowired
    private _GuardiaI repositoryGuardia;

    @Autowired
    private _AsistenciaI repositoryAsistencia;

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

    @Override
    public _Asistencia addAsistencia(Integer idGuardia, Integer idUser) {
        _Guardia guardia = repositoryGuardia.findById(idGuardia).get();
        _Asistencia asistencia = repositoryAsistencia.save(new _Asistencia(serviceUser.getUserById(idUser)));
        guardia.getAsistencias().add(asistencia);
        repositoryGuardia.save(guardia);
        return asistencia;
    }

    @Override
    public void deleteAsistencia(Integer id, Integer[] ids) {
        _Guardia guardia = repositoryGuardia.findById(id).get();
        guardia.getAsistencias().removeIf(asistencia -> {
            for (Integer idA : ids) {
                if (asistencia.getId() == idA) {
                    return true;
                }
            }
            return false;
        });
        repositoryGuardia.save(guardia);
        for (Integer idA : ids) {
            repositoryAsistencia.deleteById(idA);
        }
    }

    @Override
    public _Asistencia updateAsistencia(Integer id, String opcion, Object value) {
        _Asistencia asistencia = repositoryAsistencia.findById(id).get();
        switch (opcion) {
            case "evaluacion":
                asistencia.setEvaluacion((String) value);
                break;
            case "asistencia":
                asistencia.setAsistencia((String) value);
                break;
            default:
                break;
        }
        return repositoryAsistencia.save(asistencia);
    }

}
