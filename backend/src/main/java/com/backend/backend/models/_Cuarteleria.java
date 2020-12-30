package com.backend.backend.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class _Cuarteleria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String fecha;

    @Column
    private String evaluacion;

    @Column
    private String ubicacion;

    @OneToOne
    private _User user;

    @OneToMany
    private Set<_Incidencias> incidencias;

    public _Cuarteleria() {
    }

    public _Cuarteleria(String fecha, String ubicacion, String evaluacion, _User user) {
        this.fecha = fecha;
        this.ubicacion = ubicacion;
        this.evaluacion = evaluacion;
        this.user = user;
        this.incidencias = new HashSet<_Incidencias>();
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFecha() {
        return this.fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getEvaluacion() {
        return this.evaluacion;
    }

    public void setEvaluacion(String evaluacion) {
        this.evaluacion = evaluacion;
    }

    public String getUbicacion() {
        return this.ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public _User getUser() {
        return this.user;
    }

    public void setUser(_User user) {
        this.user = user;
    }

    public Set<_Incidencias> getIncidencias() {
        return this.incidencias;
    }

    public void setIncidencias(Set<_Incidencias> incidencias) {
        this.incidencias = incidencias;
    }

}
