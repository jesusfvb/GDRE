package com.backend.backend.requests;

public class _NewUserRqst {

    private String name;
    private String identification;
    private String userName;
    private String password;

    public _NewUserRqst() {
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getName() {
        return name;
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

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "{" + " name='" + getName() + "'" + ", identification='" + getIdentification() + "'" + ", userName='"
                + getUserName() + "'" + ", password='" + getPassword() + "'" + "}";
    }

}
