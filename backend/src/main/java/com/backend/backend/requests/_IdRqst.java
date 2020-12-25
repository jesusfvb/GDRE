package com.backend.backend.requests;

public class _IdRqst {
    private Integer id;

    public _IdRqst() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + "}";
    }

}
