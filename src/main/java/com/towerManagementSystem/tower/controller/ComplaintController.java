package com.towerManagementSystem.tower.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/complaint")
public class ComplaintController {
    @PostMapping("/")
    public ResponseEntity<?>createComplaint(){
        return ResponseEntity.ok("");
    }
    @GetMapping("/")
    public ResponseEntity<?>getComplaint(){
        return ResponseEntity.ok("");
    }
    @PutMapping("/admin/{complaintId}")
    public ResponseEntity<?>updateComplaintByAdmin(){
        return ResponseEntity.ok("");
    }
    @DeleteMapping("/{complaintId}")
    public ResponseEntity<?>deleteComplaint(){
        return ResponseEntity.ok("");
    }
    @PatchMapping("/assign-technician")
    public ResponseEntity<?>assignTechnician(){
        return ResponseEntity.ok("");
    }
    @PatchMapping("/technician-status")
    public ResponseEntity<?>updateTechnicianStatus(){
        return ResponseEntity.ok("");
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<?>getComplaintByStatus(){
        return ResponseEntity.ok("");
    }
}
