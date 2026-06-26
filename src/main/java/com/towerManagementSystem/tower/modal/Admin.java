package com.towerManagementSystem.tower.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Admin {
    @Id
    private String id;
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.EAGER , orphanRemoval = true)
    @JsonIgnore
    private List<Post> posts=new ArrayList<>();
    @OneToOne
    @MapsId
    private User user;
}
