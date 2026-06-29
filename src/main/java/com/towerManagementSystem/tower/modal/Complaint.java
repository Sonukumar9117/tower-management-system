package com.towerManagementSystem.tower.modal;

import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.domain.ConcernedDepartment;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String complaintId;
    @Column(nullable = false, columnDefinition = "Text")
    private String title;
    @Column(nullable = false, columnDefinition = "Text")
    private String description;
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private ConcernedDepartment concernedDepartment;
    @Column(nullable = false)
    private Integer daysFacingIssue;
    @Column(nullable = false)
    private String buildingName;
    private List<String> images=new ArrayList<>();
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name="user_id")
    private Tenant createdBy;
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus complaintStatus=ComplaintStatus.PENDING;
}
