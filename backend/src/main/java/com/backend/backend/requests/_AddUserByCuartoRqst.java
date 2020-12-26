package com.backend.backend.requests;

public class _AddUserByCuartoRqst {

    private Integer idCuarto;

    private Integer idUser;

    public _AddUserByCuartoRqst() {
    }

    public Integer getIdCuarto() {
        return this.idCuarto;
    }

    public void setIdCuarto(Integer idCuarto) {
        this.idCuarto = idCuarto;
    }

    public Integer getIdUser() {
        return this.idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    @Override
    public String toString() {
        return "{" + " idCuarto='" + getIdCuarto() + "'" + ", idUser='" + getIdUser() + "'" + "}";
    }

}
