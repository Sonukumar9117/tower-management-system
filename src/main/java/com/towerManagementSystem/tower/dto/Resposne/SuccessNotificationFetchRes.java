package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SuccessNotificationFetchRes extends SuccessResponse {
    private List<NotificationRespDto> notifications;
    private Pagination pagination;
    private long unreadNotificationCount;
}
