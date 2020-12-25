package com.backend.backend.requests;

public class _UpdateRqst {

    private Integer id;

    private String opcion;

    private Object value;

    public _UpdateRqst() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOpcion() {
        return opcion;
    }

    public void setOpcion(String opcion) {
        this.opcion = opcion;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + ", opcion='" + getOpcion() + "'" + ", value='" + getValue() + "'" + "}";
    }

}
