package com.backend.backend.controllers;

import java.util.List;

import com.backend.backend.models._Cuarto;
import com.backend.backend.models._Ubicacion;
import com.backend.backend.models._User;
import com.backend.backend.requests._AddUserByCuartoRqst;
import com.backend.backend.requests._DeleteRqst;
import com.backend.backend.requests._NewRoomRqst;
import com.backend.backend.requests._NewUbicacionRqst;
import com.backend.backend.requests._UpdateRqst;
import com.backend.backend.services._UbicacionS;

import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
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
@RequestMapping("/ubicacion")
@CrossOrigin("*")
public class _UbicacionC {

    private Log loggin = LogFactory.getLog(getClass());

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
    private ResponseEntity<List<_Ubicacion>> update(@RequestBody _UpdateRqst update) {
        return ResponseEntity
                .ok(serviceUbicacion.updateUbicacion(update.getId(), update.getOpcion(), update.getValue()));
    }

    @PostMapping("/cuartos")
    private ResponseEntity<_Cuarto> addRoom(@RequestBody _NewRoomRqst room) {
        return ResponseEntity
                .ok(serviceUbicacion.newCuarto(room.getNumero(), room.getNumberOfPeople(), room.getIdUbicacion()));
    }

    @DeleteMapping("/cuartos")
    private ResponseEntity<Boolean> deleteRoom(@RequestBody _DeleteRqst delete) {
        serviceUbicacion.deleteRooms(delete.getId(), delete.getIds());
        return ResponseEntity.ok(true);
    }

    @PutMapping("/cuartos")
    private ResponseEntity<_Cuarto> updateRoom(@RequestBody _UpdateRqst update) {
        return ResponseEntity.ok(serviceUbicacion.updateCuarto(update.getId(), update.getOpcion(), update.getValue()));
    }

    @PostMapping("/persona")
    private ResponseEntity<_User> addPersona(@RequestBody _AddUserByCuartoRqst rqst) {
        loggin.info(rqst.toString());
        return ResponseEntity.ok(serviceUbicacion.addUserForCuarto(rqst.getIdCuarto(), rqst.getIdUser()));
    }

    @DeleteMapping("/persona")
    private ResponseEntity<Boolean> deletePersona(@RequestBody _DeleteRqst delete) {
        serviceUbicacion.deletePeople(delete.getId(), delete.getIds());
        return ResponseEntity.ok(true);
    }
}
