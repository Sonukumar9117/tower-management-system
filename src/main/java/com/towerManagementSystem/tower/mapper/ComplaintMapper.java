package com.towerManagementSystem.tower.mapper;

import com.cloudinary.Cloudinary;
import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.dto.Resposne.ComplaintResponse;
import com.towerManagementSystem.tower.dto.request.ComplaintDto;
import com.towerManagementSystem.tower.modal.Complaint;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.utils.UploadImage;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ComplaintMapper {

    public static ComplaintResponse toComplaintResponse(Complaint complaint){

        return ComplaintResponse.builder()
                .images(complaint.getImages())
                .id(complaint.getComplaintId())
                .complaintStatus(complaint.getComplaintStatus())
                .description(complaint.getDescription())
                .title(complaint.getTitle())
                .concernedDepartment(complaint.getConcernedDepartment())
                .daysFacingIssue(complaint.getDaysFacingIssue())
                .updatedAt(complaint.getUpdatedAt())
                .createdAt(complaint.getCreatedAt())
                .createdBy(UserMapper.toUserResponseDto(complaint.getCreatedBy().getUser()))
                .complaintStatus(complaint.getComplaintStatus())
                .build();
    }

    public static Complaint toComplaint(ComplaintDto complaintDto, User user, Cloudinary cloudinary){
        List<String>imageUrls=new  ArrayList<>();

        for(int i=0;i< complaintDto.getImages().size();i++){
            imageUrls.add(UploadImage.uploadImageOnCloudinary(cloudinary,complaintDto.getImages().get(i)));
        }

        return Complaint.builder()
                .complaintStatus(ComplaintStatus.PENDING)
                .createdBy(user.getTenant())
                .description(complaintDto.getDescription())
                .buildingName(complaintDto.getBuilding())
                .concernedDepartment(complaintDto.getConcernedDepartment())
                .title(complaintDto.getTitle())
                .daysFacingIssue(complaintDto.getDaysFacingIssue())
                .images(imageUrls).build();
    }
}
