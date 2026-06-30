package com.towerManagementSystem.tower.mapper;

import com.towerManagementSystem.tower.dto.Resposne.TenantResponse;
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
                .image(user.getImage())
                .build();
    }
    public static TenantResponse toTenantResponse(User savedUser) {
        TenantResponse tenantResponse=new TenantResponse();
        tenantResponse.setName(savedUser.getName());
        tenantResponse.setImage(savedUser.getImage());
        tenantResponse.setEmail(savedUser.getEmail());
        tenantResponse.setPhone(savedUser.getPhone());
        tenantResponse.setId(savedUser.getUserId());
        tenantResponse.setFloor(savedUser.getTenant().getFloor());
        tenantResponse.setCompanyName(savedUser.getTenant().getCompanyName());
        tenantResponse.setBuilding(savedUser.getTenant().getBuilding());
        tenantResponse.setRole(savedUser.getRole());
        return tenantResponse;
    }
}
