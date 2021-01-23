package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Asistencia;
import com.backend.backend.models._Guardia;

import org.springframework.stereotype.Service;

@Service
public interface _GuardiaS {

    public List<_Guardia> listGuardia();

    public _Guardia newGuardia(Integer idProfesor, String inicio, String fin, String turno);

    public _Guardia updateGuardia(Integer id, String opcion, Object value);

    public _Asistencia addAsistencia(Integer idGuardia, Integer idUser);

    public void deleteGuardia(Integer ids[]);

    public void deleteAsistencia(Integer id, Integer ids[]);

    public _Asistencia updateAsistencia(Integer id, String opcion, Object value);

}
