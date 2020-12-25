package com.backend.backend.requests;

public class _NewRoomRqst {

    private Integer numero;

    private Integer numberOfPeople;

    private Integer idUbicacion;

    public _NewRoomRqst() {
    }

    public Integer getNumero() {
        return this.numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Integer getNumberOfPeople() {
        return this.numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public Integer getIdUbicacion() {
        return this.idUbicacion;
    }

    public void setIdUbicacion(Integer idUbicacion) {
        this.idUbicacion = idUbicacion;
    }

    @Override
    public String toString() {
        return "{" + " numero='" + getNumero() + "'" + ", numberOfPeople='" + getNumberOfPeople() + "'"
                + ", idUbicacion='" + getIdUbicacion() + "'" + "}";
    }

}
