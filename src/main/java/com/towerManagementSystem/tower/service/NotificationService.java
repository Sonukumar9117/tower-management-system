package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.domain.ScreenType;
import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.Resposne.NotificationRespDto;
import com.towerManagementSystem.tower.dto.Resposne.Pagination;
import com.towerManagementSystem.tower.dto.Resposne.SuccessNotificationFetchRes;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.mapper.UserMapper;
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
import java.util.ArrayList;
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
//       notificationRepository.deleteById(id);
        User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        assert user != null;
        notificationRecipientRepository.deleteRecipientNotification(user.getUserId(),id);
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

    public boolean createNotification(ScreenType type, String contentId, String title, String message , UserRole userRole){
        User currUser=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        Notification notification=Notification.builder()
                .title(title)
                .description(message)
                .screenType(type)
                .contentId(contentId)
                .createdBy(currUser)
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

    public SuccessNotificationFetchRes notificationRecipients(int page, int limit){
        User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        assert user != null;
        Pageable pageable=PageRequest.of(page,limit,Sort.by("notification.createdAt").descending());
        Page<NotificationRecipient>pages=notificationRecipientRepository.findAllByUserId(user.getUserId(),pageable);
        List<NotificationRecipient> notificationRecipient= pages.getContent();
        List<NotificationRespDto>notificationRespDtoList=new ArrayList<>();
        for(NotificationRecipient notif:notificationRecipient){
            UserResponseDto userResponseDto= UserMapper.toUserResponseDto(notif.getNotification().getCreatedBy());
            NotificationRespDto notificationRespDto=NotificationRespDto.builder()
                    .status(notif.isRead()?"Read":"Unread")
                    .type(notif.getNotification().getScreenType())
                    .contentId(notif.getNotification().getContentId())
                    .id(notif.getNotification().getId())
                    .title(notif.getNotification().getTitle())
                    .description(notif.getNotification().getDescription())
                    .createdAt(notif.getNotification().getCreatedAt())
                    .createdBy(userResponseDto)
                    .build();
            notificationRespDtoList.add(notificationRespDto);
        }
        Pagination pagination=Pagination.builder()
                .currentPage(pages.getNumber())
                .limit(pages.getSize())
                .totalPage(pages.getTotalPages())
                .build();
        SuccessNotificationFetchRes successNotificationFetchRes=new SuccessNotificationFetchRes();
        successNotificationFetchRes.setUnreadNotificationCount(notificationRecipientRepository.findUnreadNotificationCount(user.getUserId()).getCount());
        successNotificationFetchRes.setPagination(pagination);
        successNotificationFetchRes.setSuccess(true);
        successNotificationFetchRes.setMessage("Notification fetched successfully.");
        successNotificationFetchRes.setStatus(HttpStatus.OK.value());
        successNotificationFetchRes.setTimeStamp(LocalDateTime.now());
        successNotificationFetchRes.setNotifications(notificationRespDtoList);
        return successNotificationFetchRes;
    }

    @Transactional
    public NotificationRecipient updateNotificationRecipients(String userId, String notificationId){
//       NotificationRecipient notificationRecipient=  notificationRecipientRepository.findByNotificationIdAndUserId(notificationId,userId);
//       notificationRecipient.setRead(true);
//       return notificationRecipient;
        return null;
    }

    public long countUnreadNotification(String userId) {
        return notificationRecipientRepository.findUnreadNotificationCount(userId).getCount();
    }
}
