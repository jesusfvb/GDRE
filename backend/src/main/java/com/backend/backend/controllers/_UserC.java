package com.backend.backend.controllers;

import java.util.List;

import com.backend.backend.models._Authority;
import com.backend.backend.models._User;
import com.backend.backend.requests._IdRqst;
import com.backend.backend.requests._NewUserRqst;
import com.backend.backend.requests._UpdateRqst;
import com.backend.backend.services._UserS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class _UserC {

    @Autowired
    private _UserS serviceUser;

    @GetMapping
    private ResponseEntity<List<_User>> list() {
        return ResponseEntity.ok(serviceUser.listUser());
    }

    @GetMapping("/authorities")
    private ResponseEntity<List<_Authority>> listAuthoritiesNotUserId(
            @RequestParam(name = "id", required = true) Integer id) {
        return ResponseEntity.ok(serviceUser.listAuthorityNoIsUserId(id));
    }

    @PostMapping
    private ResponseEntity<List<_User>> add(@RequestBody _NewUserRqst user) {
        return ResponseEntity.ok(
                serviceUser.newUser(user.getName(), user.getIdentification(), user.getUserName(), user.getPassword()));
    }

    @PostMapping("/authorities")
    private ResponseEntity<Boolean> addAuthorityForUser(@RequestParam(name = "id", required = true) Integer id,
            @RequestBody _IdRqst idR) {
        serviceUser.addAuthorityOnUser(id, idR.getId());
        return ResponseEntity.ok(true);
    }

    @DeleteMapping
    private ResponseEntity<List<_User>> delete(@RequestBody Integer ids[]) {
        return ResponseEntity.ok(serviceUser.deleteUser(ids));
    }

    @DeleteMapping("/authorities")
    private ResponseEntity<Boolean> removeAuthorityForUser(@RequestParam(name = "id", required = true) Integer id,
            @RequestBody _IdRqst idR) {
        serviceUser.removeAuthorityOnUser(id, idR.getId());
        return ResponseEntity.ok(true);
    }

    @PutMapping
    private ResponseEntity<List<_User>> update(@RequestBody _UpdateRqst update) {
        return ResponseEntity.ok(serviceUser.updateUser(update.getId(), update.getOpcion(), update.getValue()));
    }
}
