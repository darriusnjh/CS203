package com.tariff.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tariff.app.dto.UserLoginRequest;
import com.tariff.app.dto.UserLoginResponse;
import com.tariff.app.entity.User;
import com.tariff.app.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public UserLoginResponse loginUser(UserLoginRequest request){
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isPresent()){
            String rawPassword = request.getPassword();
            User user = userOptional.get();
            if (user.verifyPassword(rawPassword)){
                // Successful Authentication
                return new UserLoginResponse(

                );
            }
        }
        return new UserLoginResponse(
            request.getUsername()
        );
    }

}
