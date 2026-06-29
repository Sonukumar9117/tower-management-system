package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.modal.Notification;
import com.towerManagementSystem.tower.respository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    public boolean createNotification(){
        return false;
    }
}
