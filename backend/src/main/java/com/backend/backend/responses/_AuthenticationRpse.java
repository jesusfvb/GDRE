package com.backend.backend.responses;

public class _AuthenticationRpse {

    private final String jwt;

    public _AuthenticationRpse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    @Override
    public String toString() {
        return "{" + " jwt='" + getJwt() + "'" + "}";
    }

}
