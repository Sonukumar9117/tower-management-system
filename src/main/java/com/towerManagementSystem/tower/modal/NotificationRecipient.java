package com.towerManagementSystem.tower.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRecipient {
    @EmbeddedId
    private NotificationRecipientId id;
    @ManyToOne
    @MapsId("notificationId")
    private Notification notification;
    @ManyToOne
    @MapsId("userId")
    private User user;
    private boolean isRead;
}

