package com.towerManagementSystem.tower.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuccessResponse {
    String message;
    Integer status;
    boolean success;
    LocalDateTime timeStamp;
}
