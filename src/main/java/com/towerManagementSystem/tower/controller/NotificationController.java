package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.dto.Resposne.SuccessNotificationMarkedRead;
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
       long count= notificationService.markNotificationReadByIdAndContentId(id);
        SuccessNotificationMarkedRead successResponse=new SuccessNotificationMarkedRead();
           successResponse.setUnreadNotificationCount(count);
           successResponse.setSuccess(true);
           successResponse.setTimeStamp(LocalDateTime.now());
           successResponse.setStatus(HttpStatus.OK.value());
           successResponse.setMessage("Notification mark as read");
        return ResponseEntity.ok(successResponse);
    }
}
