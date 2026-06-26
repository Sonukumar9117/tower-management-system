package com.towerManagementSystem.tower.modal;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Technician {
    @Id
    private String id;
    @Column(nullable = false)
    private String skill;
    @OneToOne
    @MapsId
    private User user;
}
