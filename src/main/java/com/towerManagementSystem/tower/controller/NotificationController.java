package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

//https://vista-tower-backend.onrender.com/api-docs/#/
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {
    private final NotificationService notificationService;
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SuccessResponse>deleteById(@PathVariable("id") String id){
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
    @PutMapping("/mark-read/{id}")
    public ResponseEntity<?>markAsRead(@PathVariable("id") String id){
        notificationService.markNotificationReadByIdAndContentId(id);
        SuccessResponse successResponse=SuccessResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message("Notification mark as read")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(successResponse);
    }
}
