package com.backend.backend.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class _Cuarto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer numero;

    @Column
    private Integer numberOfPeople;

    @ManyToMany
    private Set<_User> people;

    public _Cuarto() {
    }

    public _Cuarto(Integer numero, Integer numberOfPeople) {
        this.numero = numero;
        this.numberOfPeople = numberOfPeople;
        this.people = new HashSet<_User>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public Set<_User> getPeople() {
        return people;
    }

    public void setPeople(Set<_User> people) {
        this.people = people;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", numero='" + numero + "'" + ", numberOfPeople='" + numberOfPeople + "'"
                + ", people='" + people + "'" + "}";
    }

}
