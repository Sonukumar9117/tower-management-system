package com.towerManagementSystem.tower.dto.Resposne;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class NotificationRespDto {
    private String id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private UserResponseDto createdBy;
}
