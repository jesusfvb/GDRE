package com.backend.backend.requests;

public class _NewGuardiaRqst {

    private String inicio;

    private String fin;

    private String turno;

    private Integer id;

    public _NewGuardiaRqst() {
    }

    public String getInicio() {
        return this.inicio;
    }

    public void setInicio(String inicio) {
        this.inicio = inicio;
    }

    public String getFin() {
        return this.fin;
    }

    public void setFin(String fin) {
        this.fin = fin;
    }

    public String getTurno() {
        return this.turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}