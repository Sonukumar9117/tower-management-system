package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentReqDto {
    @NotBlank(message = "Message is required field.")
    private String message;
    @NotBlank(message = "Complaint Id is required field.")
    private String complaintId;
}
