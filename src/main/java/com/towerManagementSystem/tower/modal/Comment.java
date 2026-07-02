package com.towerManagementSystem.tower.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false,columnDefinition = "TEXT")
    private String message;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime timeStamp;
    @ManyToOne
    @JoinColumn(name = "complaint_id")
    @JsonIgnore
    private Complaint complaint;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    private User commentedBy;
}
