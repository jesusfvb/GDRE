package com.backend.backend.controllers;

import java.util.List;

import com.backend.backend.models._Ubicacion;
import com.backend.backend.requests._NewUbicacionRqst;
import com.backend.backend.requests._UpdateRqst;
import com.backend.backend.services._UbicacionS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/ubicacion")
@CrossOrigin("*")
public class _UbicacionC {

    @Autowired
    private _UbicacionS serviceUbicacion;

    @GetMapping
    public ResponseEntity<List<_Ubicacion>> list() {
        return ResponseEntity.ok(serviceUbicacion.listUbicacion());
    }

    @PostMapping
    private ResponseEntity<List<_Ubicacion>> add(@RequestBody _NewUbicacionRqst ubicacion) {
        return ResponseEntity.ok(serviceUbicacion.newUbicacion(ubicacion.getName(), ubicacion.getNumberOfRooms()));
    }

    @DeleteMapping
    private ResponseEntity<List<_Ubicacion>> delete(@RequestBody Integer ids[]) {
        return ResponseEntity.ok(serviceUbicacion.deleteUbicacion(ids));
    }

    @PutMapping
    private ResponseEntity<List<_Ubicacion>> update(@RequestBody _UpdateRqst update ){
        return ResponseEntity.ok(serviceUbicacion.updateUbicacion(update.getId(),update.getOpcion(), update.getValue()));
    }
}
