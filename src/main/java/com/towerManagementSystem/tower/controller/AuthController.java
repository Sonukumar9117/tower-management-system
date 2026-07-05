package com.towerManagementSystem.tower.controller;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.LoginRequestDto;
import com.towerManagementSystem.tower.dto.request.RegisterTechnicianDto;
import com.towerManagementSystem.tower.dto.request.RegisterTenantDto;
import com.towerManagementSystem.tower.dto.request.SignupRequestDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<SuccessResponse> signup(@ModelAttribute @Valid SignupRequestDto signupRequestDto) {
         SuccessResponse successResponse= authService.signup(signupRequestDto);
          return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
    }
    @PostMapping("register-tenant")
    public ResponseEntity<SuccessResponse> registerTenant(@ModelAttribute @Valid RegisterTenantDto registerTenantDto) {
        SuccessResponse successResponse= authService.registerTenant(registerTenantDto);
        return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
    }

    @PostMapping("register-technician")
    public ResponseEntity<SuccessResponse> registerTechnician(@ModelAttribute @Valid  RegisterTechnicianDto technicianDto) {
        SuccessResponse successResponse= authService.registerTechnician(technicianDto);
        return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public  ResponseEntity<SuccessResponse>login(@RequestBody @Valid LoginRequestDto loginRequestDto){
        SuccessResponse successResponse=authService.login(loginRequestDto);
        return ResponseEntity.ok(successResponse);
    }

    @PostMapping("/logout/{token}")
    public ResponseEntity<SuccessResponse>logout(@PathVariable("token") String token){
        return ResponseEntity.ok(authService.logout(token));
    }
    
    @PostMapping("/send")
    public ResponseEntity<?>send() throws FirebaseMessagingException {
        Message msz=Message.builder()
                .setTopic("complaint")
                .putData("body","Testing")
                .build();
       String id= FirebaseMessaging.getInstance().send(msz);
        System.out.println(id+" Message send");
     return ResponseEntity.ok("");
    }

}
