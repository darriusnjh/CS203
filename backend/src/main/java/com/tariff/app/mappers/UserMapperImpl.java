package com.tariff.app.mappers;

import org.springframework.stereotype.Component;

import com.tariff.app.dto.UserDto;
import com.tariff.app.entity.User;

@Component
public class UserMapperImpl implements UserMapper {
    
    @Override
    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setLastLogin(user.getLastLogin());
        
        return userDto;
    }
}
