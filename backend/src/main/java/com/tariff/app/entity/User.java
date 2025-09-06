package com.tariff.app.entity;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name="id")
    private Long id;

    @Column(name="username")
    private String username; 

    @Column(name="password")
    private String password;

    // Default constructor
    public User(){

    }
    
    // Constructor with parameters
    public User(Long id, String username, String password){
        this.id = id; 
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
