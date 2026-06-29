package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterTechnicianDto extends SignupRequestDto{
    @NotNull(message = "Skill is required field.")
    private String skill;
    @NotNull(message = "Experience is required field.")
    private Integer experience;
}
