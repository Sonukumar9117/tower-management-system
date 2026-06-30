package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class UpdateRegisteredTechnician {
    private MultipartFile image;
    @Size(min = 3, message = "Name must have at least 3 characters.")
    private String name;
    private String skill;
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;
}
