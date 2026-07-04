package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.modal.Notification;
import com.towerManagementSystem.tower.modal.NotificationRecipient;
import com.towerManagementSystem.tower.modal.NotificationRecipientId;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.respository.NotificationRecipientRepository;
import com.towerManagementSystem.tower.respository.NotificationRepository;
import com.towerManagementSystem.tower.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationRecipientRepository notificationRecipientRepository;
    private final UserService userService;
    public boolean createNotification(){
        return false;
    }
    public SuccessResponse deleteNotificationById(String id){
       notificationRepository.deleteById(id);
       return SuccessResponse.builder()
               .success(true)
               .timeStamp(LocalDateTime.now())
               .message("Notification deleted successfully")
               .status(HttpStatus.ACCEPTED.value())
               .build();
    }

    public @Nullable Page<Notification> getNotification(String id, int currentPage, int limit) {
        Pageable page= PageRequest.of(currentPage, limit, Sort.by("createdAt").descending()) ;
        return notificationRepository.findNotificationCreatedById(id, page);
    }
    public boolean createNotification(String title, String message , UserRole userRole){
        Notification notification=Notification.builder()
                .title(title)
                .description(message)
                .build();
        List<User>userList=userService.findUserByRole(userRole);
        for(User user:userList){
            NotificationRecipient notificationRecipient=new NotificationRecipient();
           notificationRecipient.setNotification(notification);
           notificationRecipient.setUser(user);
           notificationRecipient.setRead(false);
           notificationRecipientRepository.save(notificationRecipient);
        }
        return true;
    }
    public List<NotificationRecipient> notificationRecipients(){
        User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        assert user != null;
        return notificationRecipientRepository.findAllByUserId(user.getUserId());
    }
    @Transactional
    public NotificationRecipient updateNotificationRecipients(String userId, String notificationId){
//       NotificationRecipient notificationRecipient=  notificationRecipientRepository.findByNotificationIdAndUserId(notificationId,userId);
//       notificationRecipient.setRead(true);
//       return notificationRecipient;
        return null;
    }
}
