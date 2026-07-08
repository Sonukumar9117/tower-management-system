package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.dto.Resposne.CountUnreadNotification;
import com.towerManagementSystem.tower.modal.NotificationRecipient;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

    @Modifying
    @Transactional
    @Query("""
            delete From NotificationRecipient nr
            where nr.user.userId=:userId
            AND nr.notification.id=:id
            """)
    void deleteRecipientNotification(String userId, String id);

    @Query("""
            Select nr from NotificationRecipient nr where nr.user.userId=:userId
            AND
            nr.notification.id=:notificationId
            """)
    NotificationRecipient findByNotificationByUserIdAndNotificationId(String notificationId, String userId);

    @Modifying
    @Transactional
    @Query("""
            UPDATE NotificationRecipient  nr
            SET nr.isRead=true
            where nr.user.userId=:userId
            AND nr.notification.id=:notificationId
            """)
    NotificationRecipient updateNotificationStatus( String userId, String notificationId);

    @Modifying
    @Transactional
    @Query("""
            UPDATE NotificationRecipient nr
            SET nr.isRead=true
            where nr.user.userId=:userId
            AND nr.notification.contentId=:contentId
            """)
    void markRead(String userId, String contentId);


}
