package com.tariff.app.dto;

public class UserSignupResponse {
    private String username; 

    // Default constructor
    public UserSignupResponse(){}

    // Constructor with params
    public UserSignupResponse(String username){
        this.username = username;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
    
}
