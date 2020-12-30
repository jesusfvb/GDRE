package com.backend.backend.requests;

public class _NewCuarteleriaRqst {

    private String fecha;

    private Integer idPersona;

    public _NewCuarteleriaRqst() {
    }

    public String getFecha() {
        return this.fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Integer getIdPersona() {
        return this.idPersona;
    }

    public void setIdPersona(Integer idPersona) {
        this.idPersona = idPersona;
    }

    @Override
    public String toString() {
        return "{" + " fecha='" + getFecha() + "'" + ", idPersona='" + getIdPersona() + "'" + "}";
    }

}
