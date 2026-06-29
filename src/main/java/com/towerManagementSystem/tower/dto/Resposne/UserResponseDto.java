package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.domain.UserRole;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String id;
    private String email;
    private String name;
    private  String phone;
    private String image;
    private UserRole role;
}
