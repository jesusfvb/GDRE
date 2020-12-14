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
public class _Ubicacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private Integer numberOfRooms;

    @ManyToMany
    private Set<_Cuarto> rooms;

    public _Ubicacion() {
    }

    public _Ubicacion(String name, Integer numberOfRooms) {
        this.name = name;
        this.numberOfRooms = numberOfRooms;
        this.rooms = new HashSet<>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(Integer numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public Set<_Cuarto> getRooms() {
        return rooms;
    }

    public void setRooms(Set<_Cuarto> rooms) {
        this.rooms = rooms;
    }

}
