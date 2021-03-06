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
public class _User implements Serializable {

    private static final long serialVersionUID = 1036768324593430098L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String identification;

    @Column
    private String userName;

    @Column
    private String password;

    @ManyToMany
    private Set<_Authority> authorities;

    public _User() {
    }

    public _User(String name, String identification, String userName, String password) {
        this.name = name;
        this.identification = identification;
        this.userName = userName;
        this.password = password;
        this.authorities = new HashSet<>();
    }

    public _User(Integer id, String name, String identification, String userName, String password) {
        this.id = id;
        this.name = name;
        this.identification = identification;
        this.userName = userName;
        this.password = password;
        this.authorities = new HashSet<>();
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

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Set<_Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<_Authority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + ", name='" + getName() + "'" + ", identification='" + getIdentification()
                + "'" + ", userName='" + getUserName() + "'" + ", password='" + getPassword() + "'" + ", authorities='"
                + getAuthorities() + "'" + "}";
    }

}
