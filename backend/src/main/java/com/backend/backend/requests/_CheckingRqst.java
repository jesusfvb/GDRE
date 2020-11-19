package com.backend.backend.requests;

public class _CheckingRqst {

    private String jwt;

    public _CheckingRqst() {
    }

    public _CheckingRqst(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

}
