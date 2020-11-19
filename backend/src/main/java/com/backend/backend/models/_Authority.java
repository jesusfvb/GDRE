package com.backend.backend.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class _Authority implements Serializable {

    private static final long serialVersionUID = 6379966579961805816L;

    @Id
    private Integer id;

    @Column
    private String value;

    @Column
    private String description;

    public _Authority() {
    }

    public _Authority(Integer id, String value, String description) {
        this.id = id;
        this.value = value;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Authority [ id=" + id + ", value=" + value + ", description=" + description + " ]";
    }
}
