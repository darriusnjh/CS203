package com.tariff.app.dto;

public class UserLoginResponse {
    private String message; 
    private UserDto user;

    // Default constructor 
    public UserLoginResponse(){

    }

    // Constructor with Parameters
    public UserLoginResponse(String message, UserDto user){
        this.message = message;
        this.user = user;
    }

    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public UserDto getUser(){
        return user;
    }

    public void setUser(UserDto user){
        this.user = user;
    }
    
}
