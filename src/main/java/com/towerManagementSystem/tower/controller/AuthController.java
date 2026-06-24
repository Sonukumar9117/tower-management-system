package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.dto.LoginRequestDto;
import com.towerManagementSystem.tower.dto.SignupRequestDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<SuccessResponse> signup(@ModelAttribute SignupRequestDto signupRequestDto) {
         SuccessResponse successResponse= authService.signup(signupRequestDto);
          return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public  ResponseEntity<SuccessResponse>login(@RequestBody LoginRequestDto loginRequestDto){
        SuccessResponse successResponse=authService.login(loginRequestDto);
        return ResponseEntity.ok(successResponse);
    }

}
