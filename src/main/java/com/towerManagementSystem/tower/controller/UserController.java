package com.towerManagementSystem.tower.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/test")
    public String test(){
        return "Authenticated";
    }
}
