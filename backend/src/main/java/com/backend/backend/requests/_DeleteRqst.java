package com.backend.backend.requests;

public class _DeleteRqst {

    private Integer id;

    private Integer[] ids;

    public _DeleteRqst() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer[] getIds() {
        return this.ids;
    }

    public void setIds(Integer[] ids) {
        this.ids = ids;
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + ", ids='" + getIds() + "'" + "}";
    }

}
