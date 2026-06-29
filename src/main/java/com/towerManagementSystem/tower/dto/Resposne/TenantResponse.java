package com.towerManagementSystem.tower.dto.Resposne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantResponse extends UserResponseDto{
    private String floor;
    private String companyName;
    private String building;
}
