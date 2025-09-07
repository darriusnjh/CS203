package com.tariff.app.dto;

public class UserSignupRequest {
    private String username; 
    private String password; 

    // Default constructor 
    public UserSignupRequest(){}

    // Constructor with parameters
    public UserSignupRequest(String username, String password){
        this.username = username; 
        this.password = password;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
}
