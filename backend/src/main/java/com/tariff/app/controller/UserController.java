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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "https://localhost:3000", allowCredentials = "true")
@Tag(name = "User Management", description = "APIs for user authentication, registration, and profile management")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "User Login", description = "Authenticate user with username and password. Returns JWT token in cookie if successful.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserLoginResponse.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @ApiResponse(responseCode = "409", description = "User already logged in")
    })
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(
            @Parameter(description = "JWT cookie for checking existing session", hidden = true)
            @CookieValue(name = "jwt", defaultValue = "") String cookieCheck,
            @Parameter(description = "User login credentials")
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

    @Operation(summary = "User Registration", description = "Register a new user account. Returns JWT token in cookie if successful.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration successful",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserSignupResponse.class))),
            @ApiResponse(responseCode = "401", description = "Registration failed"),
            @ApiResponse(responseCode = "409", description = "User already logged in")
    })
    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponse> signup(
            @Parameter(description = "JWT cookie for checking existing session", hidden = true)
            @CookieValue(name = "jwt", defaultValue = "") String cookieCheck,
            @Parameter(description = "User registration information")
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

    @Operation(summary = "User Logout", description = "Logout user and clear JWT cookie")
    @ApiResponse(responseCode = "204", description = "Logout successful")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            @Parameter(description = "JWT cookie to clear", hidden = true)
            @CookieValue(name = "jwt", defaultValue = "") String cookieCheck) {

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

    @Operation(summary = "Get User Profile", description = "Get current user profile information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/profile")
    public ResponseEntity<String> profile(
            @Parameter(description = "JWT cookie for authentication", hidden = true)
            @CookieValue(name = "jwt", defaultValue = "") String cookieCheck) {

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

    @Operation(summary = "Change Password", description = "Change user password (requires authentication)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password changed successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChangePasswordResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request or password change failed"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/change-password")
    public ResponseEntity<ChangePasswordResponse> changePassword(
            @Parameter(description = "JWT cookie for authentication", hidden = true)
            @CookieValue(name = "jwt", defaultValue = "") String cookieCheck,
            @Parameter(description = "Password change request")
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
