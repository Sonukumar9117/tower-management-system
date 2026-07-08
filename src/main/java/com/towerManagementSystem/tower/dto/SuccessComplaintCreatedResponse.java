package com.towerManagementSystem.tower.dto;

import com.towerManagementSystem.tower.dto.Resposne.ComplaintResponse;
import com.towerManagementSystem.tower.dto.Resposne.CountsDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessComplaintCreatedResponse extends SuccessResponse{
    ComplaintResponse complaint;
    long unreadNotificationCounts;
}
