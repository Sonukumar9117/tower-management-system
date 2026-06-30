package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.SuccessTechnicianCreatedResponse;
import com.towerManagementSystem.tower.dto.SuccessTenantCreatedResponse;
import com.towerManagementSystem.tower.dto.request.ChangePasswordRequestDto;
import com.towerManagementSystem.tower.dto.request.UpdateRegisteredTechnician;
import com.towerManagementSystem.tower.dto.request.UpdateRegisteredTenant;
import com.towerManagementSystem.tower.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/test")
    public String test(){
        return "Authenticated";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse>deleteUserById(@PathVariable("id")String id){
        return ResponseEntity.ok(userService.deleteUserById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{role}")
    public ResponseEntity<SuccessResponse>getUser(
            @PathVariable("role")UserRole userRole,
            @RequestParam(value = "page", defaultValue = "0")int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit
            ){
        return ResponseEntity.ok(userService.getUsers(userRole, page,limit));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/change-password/{id}")
    public ResponseEntity<SuccessResponse>changePassword(@PathVariable("id")String id,@RequestBody ChangePasswordRequestDto requestDto){
        return ResponseEntity.ok(userService.changePassword(id,requestDto));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update-technician/{id}")
    public ResponseEntity<?>updateTechnician(@PathVariable("id")String id,@ModelAttribute  UpdateRegisteredTechnician updateRegisteredTechnician){
        System.out.println(updateRegisteredTechnician+"Inside contorller");
        SuccessTechnicianCreatedResponse response= userService.updateTechnician(updateRegisteredTechnician, id);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update-tenant/{id}")
    public ResponseEntity<?>updateTenant(@PathVariable("id")String id, @ModelAttribute UpdateRegisteredTenant updateRegisteredTenant){
        SuccessTenantCreatedResponse response= userService.updateTenant(updateRegisteredTenant, id);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
