package com.towerManagementSystem.tower.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginRequestDto {
    @NotNull(message = "Email is required field.")
    @Email(message = "Email is not valid.")
    private String email;
    @NotNull(message = "Password is required field.")
    private  String password;
    @NotNull(message = "FCM token is required field")
    private String fcmToken;
}
