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
public class RegisterTenantDto extends SignupRequestDto{
    @NotNull(message = "Floor is required field.")
    private String floor;
    @NotNull(message = "Company name is required.")
    private String companyName;
    @NotNull(message = "building is required field.")
    private String building;
}
