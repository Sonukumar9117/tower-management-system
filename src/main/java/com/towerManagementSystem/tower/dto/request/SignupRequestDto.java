package com.towerManagementSystem.tower.dto.request;


import com.towerManagementSystem.tower.domain.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Data
public class SignupRequestDto {
    @NotBlank(message = "Image is required field.")
    private MultipartFile image;
    @NotBlank(message = "Name is required field.")
    private String name;
    @NotBlank(message = "Email is required field.")
    @Email(message = "Email is  not valid")
    private  String email;
    @NotBlank(message = "Role is required field")
    private UserRole role;
    @NotBlank(message = "Mobile number is required field.")
    @Size(min = 10, max = 10, message = "Mobile Number is not valid")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;
    @NotBlank(message = "Password is required field.")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
            message = "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    private String password;
    @NotBlank(message = "Confirm password is required field.")
    private String confirmPassword;
}
