package com.backend.backend.controllers;

import java.util.List;

import com.backend.backend.models._Cuarteleria;
import com.backend.backend.requests._NewCuarteleriaRqst;
import com.backend.backend.requests._UpdateRqst;
import com.backend.backend.services._CuarteleriaS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cuarteleria")
@CrossOrigin("*")
public class _CuarteleriaC {

    @Autowired
    private _CuarteleriaS serviceGuardia;

    @GetMapping
    private ResponseEntity<List<_Cuarteleria>> listar() {
        return ResponseEntity.ok(serviceGuardia.listCuarteleria());
    }

    @PostMapping
    private ResponseEntity<_Cuarteleria> add(@RequestBody _NewCuarteleriaRqst rqst) {
        return ResponseEntity.ok(serviceGuardia.addCuarteleria(rqst.getFecha(), rqst.getIdPersona()));
    }

    @PutMapping
    private ResponseEntity<_Cuarteleria> update(@RequestBody _UpdateRqst rqst) {
        return ResponseEntity.ok(serviceGuardia.updateCuarteleria(rqst.getId(), rqst.getOpcion(), rqst.getValue()));
    }

    @DeleteMapping
    private ResponseEntity<Boolean> delete(@RequestBody Integer[] ids) {
        serviceGuardia.deleteCuarteleria(ids);
        return ResponseEntity.ok(true);
    }
}
