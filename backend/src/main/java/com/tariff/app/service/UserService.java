package com.tariff.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tariff.app.dto.UserLoginRequest;
import com.tariff.app.dto.UserLoginResponse;
import com.tariff.app.dto.UserSignupRequest;
import com.tariff.app.dto.UserSignupResponse;
import com.tariff.app.entity.User;
import com.tariff.app.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserLoginResponse loginUser(UserLoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isPresent()) {
            String rawPassword = request.getPassword();
            User user = userOptional.get();
            if (user.verifyPassword(rawPassword)) {
                // Successful Authentication
                return new UserLoginResponse(
                        "you have succeeded");
            }
        }
        return new UserLoginResponse(
                "you have failed");
    }

    public UserSignupResponse signupUser(UserSignupRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isPresent()) {
            // user already exists, cannot sign up
            return new UserSignupResponse(
                    "User already exists");
        } else {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setHashPassword(request.getPassword());

            // supposed to save the user to db
            userRepository.save(user);
            return new UserSignupResponse(
                    "Successful");
        }
    }

}
