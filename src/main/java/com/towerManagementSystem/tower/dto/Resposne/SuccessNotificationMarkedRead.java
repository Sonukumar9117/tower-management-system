package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SuccessNotificationMarkedRead extends SuccessResponse {
   private long unreadNotificationCount;
}
