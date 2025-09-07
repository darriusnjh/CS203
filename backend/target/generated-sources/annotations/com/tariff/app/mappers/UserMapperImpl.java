package com.tariff.app.mappers;

import com.tariff.app.dto.UserDto;
import com.tariff.app.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-07T12:13:34+0800",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.43.0.v20250819-1513, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setCreatedAt( user.getCreatedAt() );
        userDto.setId( user.getId() );
        userDto.setLastLogin( user.getLastLogin() );
        userDto.setUpdatedAt( user.getUpdatedAt() );
        userDto.setUsername( user.getUsername() );

        return userDto;
    }
}
