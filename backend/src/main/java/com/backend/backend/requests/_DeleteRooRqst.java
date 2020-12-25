package com.backend.backend.requests;

public class _DeleteRooRqst {

    private Integer idUbicacion;

    private Integer[] ids;

    public _DeleteRooRqst() {
    }

    public Integer getIdUbicacion() {
        return this.idUbicacion;
    }

    public void setIdUbicacion(Integer idUbicacion) {
        this.idUbicacion = idUbicacion;
    }

    public Integer[] getIds() {
        return this.ids;
    }

    public void setIds(Integer[] ids) {
        this.ids = ids;
    }

    @Override
    public String toString() {
        return "{" + " idUbicacion='" + getIdUbicacion() + "'" + ", ids='" + getIds() + "'" + "}";
    }

}
