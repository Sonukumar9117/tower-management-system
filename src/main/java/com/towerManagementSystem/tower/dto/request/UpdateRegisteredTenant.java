package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UpdateRegisteredTenant {
    private MultipartFile image;
    @Size(min = 3, message = "Name must have at least 3 characters.")
    private String name;
    @Size(min = 3, message = "Company name must have at least 3 characters.")
    private String companyName;
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;
    private Integer floor;
}
