package com.towerManagementSystem.tower.modal;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRecipientId implements Serializable {
    private String notificationId;
    private String userId;
}
