package com.backend.backend.controllers;

import com.backend.backend.requests._AuthenticationRqst;
import com.backend.backend.requests._CheckingRqst;
import com.backend.backend.responses._AuthenticationRpse;
import com.backend.backend.services._JwtS;
import com.backend.backend.services._UserDetailsSI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class _LoginC {

    @Autowired(required = true)
    private AuthenticationManager authenticationManager;

    @Autowired
    private _UserDetailsSI serviceUserDetails;

    @Autowired
    private _JwtS serviceJwt;

    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody _AuthenticationRqst requestAuthentication)
            throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    requestAuthentication.getUserName(), requestAuthentication.getPassword()));
        } catch (Exception e) {
            throw new Exception("Usuario o Contraseña Incorrecta", e);
        }
        final UserDetails userDetails = serviceUserDetails.loadUserByUsername(requestAuthentication.getUserName());
        final String jwt = serviceJwt.generateToken(userDetails);

        return ResponseEntity.ok(new _AuthenticationRpse(jwt));
    }

    @PutMapping()
    public ResponseEntity<Boolean> isTokenExpired(@RequestBody _CheckingRqst jwt) throws Exception {
        return ResponseEntity.ok(serviceJwt.isTokenExpired(jwt.getJwt()));
    }
}
