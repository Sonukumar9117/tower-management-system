package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.domain.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserResponseDto {
    private String id;
    private String email;
    private  String phone;
    private String image;
    private UserRole role;

}
