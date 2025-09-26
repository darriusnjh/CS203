package com.tariff.app.service;

import java.time.OffsetDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tariff.app.dto.UserLoginRequest;
import com.tariff.app.dto.UserLoginResponse;
import com.tariff.app.dto.UserSignupRequest;
import com.tariff.app.dto.UserSignupResponse;
import com.tariff.app.dto.ChangePasswordRequest;
import com.tariff.app.dto.ChangePasswordResponse;
import com.tariff.app.entity.User;
import com.tariff.app.repository.UserRepository;
import com.tariff.app.mappers.UserMapper;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    public UserLoginResponse loginUser(UserLoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isPresent()) {
            String rawPassword = request.getPassword();
            User user = userOptional.get();
            if (user.verifyPassword(rawPassword)) {
                // Successful Authentication
                return new UserLoginResponse(
                        "login succeeded",
                        userMapper.toDto(user));
            }
        }
        return new UserLoginResponse("login failed",
                null);
    }

    public UserSignupResponse signupUser(UserSignupRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isPresent()) {
            // user already exists, cannot sign up
            return new UserSignupResponse(
                    "User already exists",
                    null);
        } else {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setHashPassword(request.getPassword());

            // Set timestamp fields
            OffsetDateTime now = OffsetDateTime.now();
            user.setCreatedAt(now);
            user.setUpdatedAt(now);
            // lastLogin remains null for new users

            // Save the user to database
            userRepository.save(user);
            return new UserSignupResponse("Successful",
                    userMapper.toDto(user));
        }
    }

    public ChangePasswordResponse changePassword(String username, ChangePasswordRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Verify current password
            if (!user.verifyPassword(request.getCurrentPassword())) {
                return new ChangePasswordResponse(false, "Current password is incorrect");
            }
            
            // Validate new password (basic validation)
            if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
                return new ChangePasswordResponse(false, "New password must be at least 6 characters long");
            }
            
            // Update password
            user.setHashPassword(request.getNewPassword());
            user.setUpdatedAt(OffsetDateTime.now());
            userRepository.save(user);
            
            return new ChangePasswordResponse(true, "Password changed successfully");
        }
        
        return new ChangePasswordResponse(false, "User not found");
    }

}
