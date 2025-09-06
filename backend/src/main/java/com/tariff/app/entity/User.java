package com.tariff.app.entity;

import javax.persistence.*;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    private static final Argon2PasswordEncoder encoder = new Argon2PasswordEncoder();

    // Default constructor
    public User() {

    }

    // Constructor with parameters
    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setHashPassword(String password) {
        String hashedPassword = encoder.encode(password);
        this.password = hashedPassword;
    }

    public boolean verifyPassword(String rawPassword){
        return encoder.matches(rawPassword, password);
    }

}
