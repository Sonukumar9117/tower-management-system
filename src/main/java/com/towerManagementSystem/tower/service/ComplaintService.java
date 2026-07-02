package com.towerManagementSystem.tower.service;

import com.cloudinary.Cloudinary;
import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.dto.Resposne.*;
import com.towerManagementSystem.tower.dto.SuccessCommentResponse;
import com.towerManagementSystem.tower.dto.SuccessComplaintCreatedResponse;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.request.CommentReqDto;
import com.towerManagementSystem.tower.dto.request.ComplaintDto;
import com.towerManagementSystem.tower.dto.request.ComplaintUpdateReqDto;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.mapper.ComplaintMapper;
import com.towerManagementSystem.tower.modal.Comment;
import com.towerManagementSystem.tower.modal.Complaint;
import com.towerManagementSystem.tower.modal.Tenant;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.respository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;


@RequiredArgsConstructor
@Service
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final Cloudinary cloudinary;
    public SuccessComplaintCreatedResponse createComplaint(ComplaintDto complaintDto){
       User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        Complaint createdComplaint=complaintRepository.save(ComplaintMapper.toComplaint(complaintDto,user,cloudinary));
        SuccessComplaintCreatedResponse successComplaintCreatedResponse=new SuccessComplaintCreatedResponse();
         successComplaintCreatedResponse.setComplaint(ComplaintMapper.toComplaintResponse(createdComplaint));
         successComplaintCreatedResponse.setSuccess(true);
         successComplaintCreatedResponse.setStatus(HttpStatus.CREATED.value());
         successComplaintCreatedResponse.setMessage("Complaint created successfully");
         successComplaintCreatedResponse.setTimeStamp(LocalDateTime.now());
         return successComplaintCreatedResponse;
    }

    public SuccessFetchedComplaintList getComplaint(int pageNumber, int pageSize){
        Pageable pageable= PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").descending());
        return formateComplaintList(complaintRepository.findAll(pageable));
    }

    public SuccessResponse deleteById(String complaintId){
        Complaint complaint=complaintRepository
                .findById(complaintId)
                .orElseThrow(
                        ()->new CustomException("Complaint doesn't exist")
                );
        Tenant user =  complaint.getCreatedBy();
        List<Complaint>complaintList=user.getComplaints();
        complaintList.remove(complaint);
        user.setComplaints(complaintList);
        complaintRepository.deleteById(complaintId);
        return SuccessResponse
                .builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.OK.value())
                .message("Complaint deleted successfully.")
                .build();
    }

    public SuccessFetchedComplaintList getComplaintListByStatus(int pageNumber, int pageSize, ComplaintStatus complaintStatus){
        Pageable pageable= PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").descending());
         return formateComplaintList(complaintRepository.findByComplaintStatus(pageable,complaintStatus));
    }

   private SuccessFetchedComplaintList formateComplaintList(Page<Complaint>complaintPage){
       List<Complaint>complaintList=complaintPage.getContent();
       List<ComplaintResponse>complaintResponseList=new ArrayList<>();
       for(Complaint complaint:complaintList){
           complaintResponseList.add(ComplaintMapper.toComplaintResponse(complaint));
       }
       Pagination pagination=Pagination.builder()
               .currentPage(complaintPage.getNumber())
               .limit(complaintPage.getSize())
               .totalPage(complaintPage.getTotalPages())
               .build();
       SuccessFetchedComplaintList successFetchedComplaintList=new SuccessFetchedComplaintList();
       successFetchedComplaintList.setCounts(getCount());
       successFetchedComplaintList.setComplaints(complaintResponseList);
       successFetchedComplaintList.setPagination(pagination);
       successFetchedComplaintList.setMessage("Complaint fetched successfully.");
       successFetchedComplaintList.setStatus(HttpStatus.OK.value());
       successFetchedComplaintList.setSuccess(true);
       successFetchedComplaintList.setTimeStamp(LocalDateTime.now());
       return successFetchedComplaintList;
   }

   private CountsDto getCount(){
       CountNumberComplainByStatus countNumberComplainByStatus= complaintRepository.findNumberComplaint();
       return CountsDto.builder()
               .pending(countNumberComplainByStatus.getPending())
               .resolved(countNumberComplainByStatus.getResolved())
               .inProgress(countNumberComplainByStatus.getInProgress())
               .build();
   }

   @Transactional
   public SuccessCommentResponse addComment(CommentReqDto commentReqDto){
        User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        Complaint complaint=complaintRepository.findById(commentReqDto.getComplaintId()).orElseThrow(()->new CustomException("Complaint doesn't exist."));
     Comment comment =Comment.builder()
             .commentedBy(user)
             .complaint(complaint)
             .message(commentReqDto.getMessage())
             .build();
        List<Comment>commentList=complaint.getCommentList();
        commentList.add(comment);
       commentList.sort((c1, c2) -> c1.getTimeStamp().isBefore(c2.getTimeStamp()) ? 1 : 0);
       SuccessCommentResponse successCommentResponse=new SuccessCommentResponse();
       successCommentResponse.setComments(commentList);
       successCommentResponse.setSuccess(true);
       successCommentResponse.setTimeStamp(LocalDateTime.now());
       successCommentResponse.setStatus(HttpStatus.ACCEPTED.value());
       successCommentResponse.setMessage("Comment added successfully.");
        return successCommentResponse;
   }

   @Transactional
   public SuccessComplaintCreatedResponse  updateComplaintById(ComplaintUpdateReqDto complaintUpdateDto){
       System.out.println(complaintUpdateDto+"THis is complaint update dto");
        Complaint complaint=complaintRepository.findById(complaintUpdateDto.getComplaintId()).orElseThrow(()->new CustomException("Complaint doesn't exist"));
        if(complaintUpdateDto.getComplaintStatus()!=null) {
            complaint.setComplaintStatus(complaintUpdateDto.getComplaintStatus());
        }
        if(complaintUpdateDto.getComplaintSeverity()!=null)
            complaint.setComplaintSeverity(complaintUpdateDto.getComplaintSeverity());
        complaint.setUpdatedAt(LocalDateTime.now());
       SuccessComplaintCreatedResponse successComplaintCreatedResponse=new SuccessComplaintCreatedResponse();
       successComplaintCreatedResponse.setComplaint(ComplaintMapper.toComplaintResponse(complaint));
       successComplaintCreatedResponse.setSuccess(true);
       successComplaintCreatedResponse.setStatus(HttpStatus.ACCEPTED.value());
       successComplaintCreatedResponse.setMessage("Complaint updated successfully");
       successComplaintCreatedResponse.setTimeStamp(LocalDateTime.now());
       return successComplaintCreatedResponse;
   }
}
