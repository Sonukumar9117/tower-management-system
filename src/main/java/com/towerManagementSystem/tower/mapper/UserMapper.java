package com.towerManagementSystem.tower.mapper;

import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.utils.UploadImage;

public class UserMapper {
    public static UserResponseDto toUserResponseDto(User user){
        return UserResponseDto.builder()
                .id(user.getUserId())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .name(user.getName())
                .image(
                        UploadImage.generateImageUrl(user.getImage())
                )
                .build();
    }
}
