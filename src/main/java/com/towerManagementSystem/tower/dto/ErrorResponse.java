package com.towerManagementSystem.tower.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class ErrorResponse {
    String message;
    String type;
    Integer status;
    boolean success;
    Map<Object,Object > errors;
    LocalDateTime timeStamp;
}
