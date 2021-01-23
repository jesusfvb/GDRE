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
public class _Guardia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String inicio;

    @Column
    private String fin;

    @Column
    private String turno;

    @Column
    private String cartaAdvertencia;

    @OneToOne
    private _User profesor;

    @OneToMany
    private Set<_Asistencia> asistencias;

    public _Guardia() {
    }

    public _Guardia(String inicio, String fin, String turno, _User profesor) {
        this.inicio = inicio;
        this.fin = fin;
        this.turno = turno;
        this.profesor = profesor;
        this.cartaAdvertencia = "";
        this.asistencias = new HashSet<_Asistencia>();
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getCartaAdvertencia() {
        return this.cartaAdvertencia;
    }

    public void setCartaAdvertencia(String cartaAdvertencia) {
        this.cartaAdvertencia = cartaAdvertencia;
    }

    public _User getProfesor() {
        return this.profesor;
    }

    public void setProfesor(_User profesor) {
        this.profesor = profesor;
    }

    public Set<_Asistencia> getAsistencias() {
        return this.asistencias;
    }

    public void setAsistencias(Set<_Asistencia> asistencias) {
        this.asistencias = asistencias;
    }

}
