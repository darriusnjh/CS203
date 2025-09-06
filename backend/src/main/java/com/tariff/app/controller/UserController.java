package com.tariff.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tariff.app.dto.UserLoginRequest;
import com.tariff.app.dto.UserLoginResponse;
import com.tariff.app.service.UserService;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins="*")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest request ){
        UserLoginResponse response = userService.loginUser(request);
        return ResponseEntity.ok(response);
    }

    // @PostMapping("/signup")
    // public ResponseEntity<UserSignupResponse> signup(@RequestBody){

    // }
    
}
