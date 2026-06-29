package com.towerManagementSystem.tower.dto;

import com.towerManagementSystem.tower.dto.Resposne.TenantResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessTenantCreatedResponse extends SuccessResponse{
    private TenantResponse user;
}
