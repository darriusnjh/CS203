package com.tariff.app.dto;

public class UserSignupResponse {
    private String username; 
    private UserDto user;

    // Default constructor
    public UserSignupResponse(){}

    // Constructor with params
    public UserSignupResponse(String username, UserDto user){
        this.username = username;
        this.user = user;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public UserDto getUser(){
        return user;
    }

    public void setUser(UserDto user){
        this.user = user;
    }    
}
