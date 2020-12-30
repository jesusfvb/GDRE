package com.backend.backend.services;

import java.util.List;

import com.backend.backend.models._Cuarteleria;

import org.springframework.stereotype.Service;

@Service
public interface _CuarteleriaS {

    public List<_Cuarteleria> listCuarteleria();

    public _Cuarteleria addCuarteleria(String fecha, Integer idPersona);

    public void deleteCuarteleria(Integer[] ids);

    public _Cuarteleria updateCuarteleria(Integer id, String opcion, Object value);
}
