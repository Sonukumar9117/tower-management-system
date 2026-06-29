package com.towerManagementSystem.tower.modal;

import jakarta.persistence.*;

@Entity
public class NotificationRecipient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    private Notification notification;
    @ManyToOne
    private User user;

}
