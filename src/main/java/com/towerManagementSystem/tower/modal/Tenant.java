package com.towerManagementSystem.tower.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Tenant{
    @Id
    private String id;
    @Column(nullable = false)
    private String floor;
    @Column(nullable = false)
    private String companyName;
    @Column(nullable = false)
    private String building;
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonIgnore
    private List<Complaint> complaints=new ArrayList<>();
    @OneToOne
    @MapsId
    private User user;
}
