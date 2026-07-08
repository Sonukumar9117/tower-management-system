package com.towerManagementSystem.tower.service;

import com.google.firebase.messaging.*;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.modal.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PushNotificationService {

    /**
     * This function broadcast notification to all the registered device whose fcm token you will passed.
     * @param title
     * @param body
     * @param fcmTokens
     */
    public void sendNotification(String title, String body, List<String> fcmTokens)  {
        String imageUrl=((User) Objects.requireNonNull(Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal())).getImage();
        Notification notification= Notification.builder()
                .setTitle(title)
                .setImage(imageUrl)
                .setBody(body)
                .build();
        MulticastMessage msg= MulticastMessage.builder()
                .setNotification(notification)
                .addAllTokens(fcmTokens)
                .build();
        try{
         BatchResponse response=   FirebaseMessaging.getInstance().sendEachForMulticast(msg);
            System.out.println(response.getSuccessCount()+" message sent"+ response.getFailureCount());
        } catch (FirebaseMessagingException e) {
            throw new CustomException(e.getMessage());
        }
    }
}
