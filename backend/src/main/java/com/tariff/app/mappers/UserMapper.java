package com.tariff.app.mappers;

import com.tariff.app.dto.UserDto;
import com.tariff.app.entity.User;

public interface UserMapper {
    UserDto toDto(User user);
}
