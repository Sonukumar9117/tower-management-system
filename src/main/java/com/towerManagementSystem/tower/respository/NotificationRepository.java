package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.modal.Notification;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,String> {
    @Nullable Page<Notification> findNotificationCreatedById(String id, Pageable page);
}
