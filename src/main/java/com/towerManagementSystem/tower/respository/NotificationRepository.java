package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.modal.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,String> {
}
