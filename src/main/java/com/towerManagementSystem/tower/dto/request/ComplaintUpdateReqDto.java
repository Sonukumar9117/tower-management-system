package com.towerManagementSystem.tower.dto.request;

import com.towerManagementSystem.tower.domain.ComplaintSeverity;
import com.towerManagementSystem.tower.domain.ComplaintStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ComplaintUpdateReqDto {
    @NotBlank(message = "Complaint id is required field.")
    private String complaintId;
    private ComplaintSeverity complaintSeverity;
    private ComplaintStatus complaintStatus;
}
