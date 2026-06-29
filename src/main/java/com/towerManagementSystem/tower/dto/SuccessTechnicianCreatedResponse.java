package com.towerManagementSystem.tower.dto;

import com.towerManagementSystem.tower.dto.Resposne.TechnicianResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessTechnicianCreatedResponse extends SuccessResponse{
    private TechnicianResponse user;

}
