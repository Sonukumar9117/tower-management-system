package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//https://vista-tower-backend.onrender.com/api-docs/#/
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {
    private final NotificationService notificationService;
    public ResponseEntity<SuccessResponse>deleteById(String id){
        return  new ResponseEntity<>(notificationService.deleteNotificationById(id), HttpStatus.ACCEPTED);
    }
    @GetMapping("/notification-list")
    public ResponseEntity<?>getNotificationById(
            @RequestParam(value = "page",defaultValue = "0")
            int page,
            @RequestParam(value = "limit", defaultValue = "20")
            int limit
            ){
        return ResponseEntity.ok(notificationService.notificationRecipients(page,limit));
    }
}
