package com.towerManagementSystem.tower.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuccessResponse {
    private String message;
    private Integer status;
    private boolean success;
    private LocalDateTime timeStamp;
}
