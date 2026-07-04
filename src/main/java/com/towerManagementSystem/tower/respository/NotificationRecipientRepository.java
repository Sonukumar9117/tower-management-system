package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.dto.Resposne.CountUnreadNotification;
import com.towerManagementSystem.tower.modal.NotificationRecipient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient,String> {
    @Query("""
    SELECT nr
    FROM NotificationRecipient nr
    WHERE nr.user.userId = :userId
    ORDER BY nr.notification.createdAt DESC
    """)
    Page<NotificationRecipient> findAllByUserId(@Param("userId") String userId, Pageable pageable);
    @Query("""
            SELECT count(*) as count
            FROM NotificationRecipient nr
            where nr.user.userId = :userId
            AND nr.isRead=false
            """)
    CountUnreadNotification findUnreadNotificationCount(String userId);
//    NotificationRecipient findByNotificationIdAndUserId(String notificationId, String userId);

}
