package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.dto.Resposne.SuccessFetchedComplaintList;
import com.towerManagementSystem.tower.dto.SuccessComplaintCreatedResponse;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.request.CommentReqDto;
import com.towerManagementSystem.tower.dto.request.ComplaintDto;
import com.towerManagementSystem.tower.dto.request.ComplaintUpdateReqDto;
import com.towerManagementSystem.tower.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/complaint")
public class ComplaintController {
    private final ComplaintService complaintService;

    @PreAuthorize("hasRole('TENANT')")
    @PostMapping("/create-complaint")
    public ResponseEntity<SuccessComplaintCreatedResponse>createComplaint(@ModelAttribute @Valid ComplaintDto complaintDto){
        SuccessComplaintCreatedResponse successComplaintCreatedResponse= complaintService.createComplaint(complaintDto);
        return new ResponseEntity<>(successComplaintCreatedResponse, HttpStatus.CREATED);
    }

    @GetMapping("/get-complaint")
    public ResponseEntity<?>getComplaint(
            @RequestParam(value = "page",defaultValue = "0")int page,
            @RequestParam(value = "limit", defaultValue = "20")int limit
            ){
        SuccessFetchedComplaintList successFetchedComplaintList= complaintService.getComplaint(page,limit);
        return ResponseEntity.ok(successFetchedComplaintList);
    }

    @PutMapping("/admin/{complaintId}")
    public ResponseEntity<?>updateComplaintByAdmin(){
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/{complaintId}")
    public ResponseEntity<?>deleteComplaint(@PathVariable String complaintId){
        SuccessResponse successResponse=complaintService.deleteById(complaintId);
        return ResponseEntity.ok(successResponse);
    }

    @PatchMapping("/assign-technician")
    public ResponseEntity<?>assignTechnician(){
        return ResponseEntity.ok("");
    }

    @PatchMapping("/technician-status")
    public ResponseEntity<?>updateTechnicianStatus(){
        return ResponseEntity.ok("");
    }

    @GetMapping("/{status}")
    public ResponseEntity<?>getComplaintByStatus(
            @RequestParam(value = "page",defaultValue = "0")int page,
            @RequestParam(value = "limit",defaultValue = "20") int limit,
            @PathVariable("status") ComplaintStatus status
            ){
        return ResponseEntity.ok(complaintService.getComplaintListByStatus(page,limit,status));
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<?>getComplaintById(@PathVariable("id")String id){
        return ResponseEntity.ok(complaintService.getComplaintById(id));
    }
    @PutMapping("/add-comment")
    public ResponseEntity<?>addComplaint(@RequestBody CommentReqDto comment){
        return new ResponseEntity<>(complaintService.addComment(comment), HttpStatus.ACCEPTED);
    }
    @PutMapping("/update")
    public ResponseEntity<?>updateComplaint(@RequestBody  ComplaintUpdateReqDto complaintUpdateReqDto){
        return new ResponseEntity<>(complaintService.updateComplaintById(complaintUpdateReqDto),HttpStatus.ACCEPTED);
    }
}
