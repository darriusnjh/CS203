package com.tariff.app.mappers;

import org.mapstruct.Mapper;

import com.tariff.app.dto.UserDto;
import com.tariff.app.dto.UserLoginRequest;
import com.tariff.app.dto.UserLoginResponse;
import com.tariff.app.dto.UserSignupRequest;
import com.tariff.app.dto.UserSignupResponse;
import com.tariff.app.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);

}
