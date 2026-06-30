package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequestDto {
    @NotBlank(message = "Password is required field.")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
            message = "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    private String password;
    @NotBlank(message = "Confirm password is required field.")
    private String confirmPassword;
}
