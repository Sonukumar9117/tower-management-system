package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SuccessLoginResponse  extends SuccessResponse {
    private String token;
    private UserResponseDto user;
}
