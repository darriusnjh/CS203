package com.tariff.app.dto;

public class UserLoginResponse {
    private String username; 

    // Default constructor 
    public UserLoginResponse(){

    }

    // Constructor with Parameters
    public UserLoginResponse(String username){
        this.username = username;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
    
}
