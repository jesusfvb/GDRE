package com.backend.backend.controllers;

import java.util.List;

import com.backend.backend.models._Guardia;
import com.backend.backend.requests._NewGuardiaRqst;
import com.backend.backend.requests._UpdateRqst;
import com.backend.backend.services._GuardiaS;

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
@RequestMapping("/guardia")
@CrossOrigin("*")
public class _GuardiaC {

    @Autowired
    private _GuardiaS serviceGuardia;

    @GetMapping
    private ResponseEntity<List<_Guardia>> list() {
        return ResponseEntity.ok(serviceGuardia.listGuardia());
    }

    @PostMapping
    private ResponseEntity<_Guardia> add(@RequestBody _NewGuardiaRqst rqst) {
        return ResponseEntity
                .ok(serviceGuardia.newGuardia(rqst.getId(), rqst.getInicio(), rqst.getFin(), rqst.getTurno()));
    }

    @PutMapping
    private ResponseEntity<_Guardia> update(@RequestBody _UpdateRqst update) {
        return ResponseEntity.ok(serviceGuardia.updateGuardia(update.getId(), update.getOpcion(), update.getValue()));
    }

    @DeleteMapping
    private ResponseEntity<Boolean> delete(@RequestBody Integer ids[]) {
        return ResponseEntity.ok(true);
    }

}
