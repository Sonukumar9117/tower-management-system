package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.domain.ComplaintSeverity;
import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.domain.ConcernedDepartment;
import com.towerManagementSystem.tower.modal.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintResponse {
    private String id;
    private String title;
    private String description;
    private Integer daysFacingIssue;
    private ComplaintStatus complaintStatus;
    private ConcernedDepartment concernedDepartment;
    private List<String> images;
    private UserResponseDto createdBy;
    private ComplaintSeverity severity;
    private List<Comment>comments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
