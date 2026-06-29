package com.towerManagementSystem.tower.dto.Resposne;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TechnicianResponse extends UserResponseDto{
    private String skill;
    private String experience;
}
