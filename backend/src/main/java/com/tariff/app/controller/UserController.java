package com.tariff.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

import com.tariff.app.dto.UserLoginRequest;
import com.tariff.app.dto.UserLoginResponse;
import com.tariff.app.dto.UserSignupRequest;
import com.tariff.app.dto.UserSignupResponse;
import com.tariff.app.dto.ChangePasswordRequest;
import com.tariff.app.dto.ChangePasswordResponse;
import com.tariff.app.service.JwtService;
import com.tariff.app.service.UserService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/user")
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "https://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@CookieValue(name = "jwt", defaultValue = "") String cookieCheck,
            @RequestBody UserLoginRequest request) {

        // If a cookie exists and is valid JWT, refuse the connection
        if (!cookieCheck.equals("") && JwtService.validateJwt(cookieCheck)) {
            return ResponseEntity.status(409).body(null);
        }

        // If no cookies, continue
        UserLoginResponse response = userService.loginUser(request);
        // If successful login, create a cookie and send it with request
        if (response.getMessage().contains("succeeded")) {
            String jwt = JwtService.createJwt(request.getUsername(), "testing");
            ResponseCookie cookie = JwtService.createJwtCookie(jwt);
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
        } else {
            // Login fail
            return ResponseEntity.status(401).body(response);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponse> signup(@CookieValue(name = "jwt", defaultValue = "") String cookieCheck,
            @RequestBody UserSignupRequest request) {
        // If a cookie exists and is valid JWT, refuse the connection
        if (!cookieCheck.equals("") && JwtService.validateJwt(cookieCheck)) {
            return ResponseEntity.status(409).body(null);
        }

        UserSignupResponse response = userService.signupUser(request);
        if (response.getUser() == null) {
            // sign up fail
            return ResponseEntity.status(401).body(response);
        }
        // If successful sign up, create cookie and send it along
        String jwt = JwtService.createJwt(response.getUsername(), "testing");
        ResponseCookie cookie = JwtService.createJwtCookie(jwt);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(name = "jwt", defaultValue = "") String cookieCheck) {

        // Check if user has cookies
        if (!cookieCheck.equals("")) {
            Claims claim = JwtService.validateJwtandReturnClaim(cookieCheck);
            if (claim != null) {
                String username = claim.getSubject();

                // TODO update the last_logout column for the user / JWT blacklist table

            }

        }
        ResponseCookie cookie = JwtService.createEmptyCookie();

        return ResponseEntity.status(204).header(HttpHeaders.SET_COOKIE, cookie.toString()).body(null);
    }

    @GetMapping("/profile")
    public ResponseEntity<String> profile(@CookieValue(name = "jwt", defaultValue = "") String cookieCheck) {

        // Check if user has cookies
        if (!cookieCheck.equals("")) {
            Claims claim = JwtService.validateJwtandReturnClaim(cookieCheck);
            if (claim != null) {
                String username = claim.getSubject();

                //TODO change return to something more useful
                return ResponseEntity.ok( username);
            }

        }
        return ResponseEntity.status(401).body("Unauthorized");
    }

    @PostMapping("/change-password")
    public ResponseEntity<ChangePasswordResponse> changePassword(
            @CookieValue(name = "jwt", defaultValue = "") String cookieCheck,
            @RequestBody ChangePasswordRequest request) {
        System.err.println("cookie: " + cookieCheck);
        // Check if user has valid JWT
        if (cookieCheck.equals("")) {
            return ResponseEntity.status(401).body(new ChangePasswordResponse(false, "Not authenticated"));
        }
        
        Claims claim = JwtService.validateJwtandReturnClaim(cookieCheck);
        if (claim == null) {
            return ResponseEntity.status(401).body(new ChangePasswordResponse(false, "Invalid token"));
        }
        
        String username = claim.getSubject();
        ChangePasswordResponse response = userService.changePassword(username, request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(400).body(response);
        }
    }

}
