package com.towerManagementSystem.tower.service;

import com.cloudinary.Cloudinary;
import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.Resposne.Pagination;
import com.towerManagementSystem.tower.dto.Resposne.TechnicianResponse;
import com.towerManagementSystem.tower.dto.Resposne.TenantResponse;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.SuccessTechnicianCreatedResponse;
import com.towerManagementSystem.tower.dto.SuccessTenantCreatedResponse;
import com.towerManagementSystem.tower.dto.SuccessUserListResponse;
import com.towerManagementSystem.tower.dto.request.ChangePasswordRequestDto;
import com.towerManagementSystem.tower.dto.request.UpdateRegisteredTechnician;
import com.towerManagementSystem.tower.dto.request.UpdateRegisteredTenant;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.mapper.UserMapper;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.respository.UserRepository;
import com.towerManagementSystem.tower.utils.UploadImage;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Cloudinary cloudinary;

    public SuccessResponse deleteUserById(String userId){
        User user=userRepository.findById(userId).orElseThrow(()->new CustomException("User doesn't exist."));
        userRepository.deleteById(userId);
        return SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("User deleted successfully.")
                .success(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public SuccessUserListResponse getUsers(UserRole userRole,int pageNumber, int pageSize){
        Pageable pageable= PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").descending());
        Page<User> userPage= userRepository.findUserByRole(pageable,userRole);
        List<UserResponseDto> users = getUserResponseDtos(userRole, userPage);
        Pagination pagination=Pagination.builder()
                .currentPage(userPage.getNumber())
                .limit(userPage.getSize())
                .totalPage(userPage.getTotalPages())
                .build();
        SuccessUserListResponse successUserListResponse=new SuccessUserListResponse();
        successUserListResponse.setUsers(users);
        successUserListResponse.setSuccess(true);
        successUserListResponse.setTimeStamp(LocalDateTime.now());
        successUserListResponse.setStatus(HttpStatus.OK.value());
        successUserListResponse.setMessage(userRole+"fetched successfully");
        successUserListResponse.setPagination(pagination);
        return successUserListResponse;
    }

    private List<UserResponseDto> getUserResponseDtos(UserRole userRole, Page<User> userPage) {
        List<User>userList= userPage.getContent();
        List<UserResponseDto>users=new ArrayList<>();
        if(userRole ==UserRole.TECHNICIAN){
            userList.forEach(user->{
                TechnicianResponse technicianResponse = UserMapper.toTechnicianResponse(user);
                users.add(technicianResponse);
            });
        }
        else if(userRole ==UserRole.TENANT){
            userList.forEach( user->{
                TenantResponse tenantResponse=new TenantResponse();
                tenantResponse.setName(user.getName());
                tenantResponse.setImage(user.getImage());
                tenantResponse.setEmail(user.getEmail());
                tenantResponse.setPhone(user.getPhone());
                tenantResponse.setId(user.getUserId());
                tenantResponse.setFloor(user.getTenant().getFloor());
                tenantResponse.setCompanyName(user.getTenant().getCompanyName());
                tenantResponse.setBuilding(user.getTenant().getBuilding());
                tenantResponse.setRole(user.getRole());
                users.add(tenantResponse);
            });
        }
        return users;
    }

    @Transactional
    public @Nullable SuccessResponse changePassword(String id, ChangePasswordRequestDto requestDto) {
        if(!requestDto.getPassword().equals(requestDto.getConfirmPassword())){
            throw  new CustomException("Confirm password doesn't match");
        }
       User user= userRepository.findById(id).orElseThrow(()->new CustomException("User doesn't exist"));
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        return SuccessResponse.builder()
                .message("Password changed successfully")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.ACCEPTED.value())
                .success(true)
                .build();
    }

    @Transactional
    public SuccessTechnicianCreatedResponse updateTechnician(UpdateRegisteredTechnician updateRegisteredTechnician, String id) {
         User user=userRepository.findById(id).orElseThrow(()->new CustomException("User doesn't exist"));
        System.out.println(updateRegisteredTechnician.toString());
         if(updateRegisteredTechnician.getImage()!=null){
             String imageUrl=UploadImage.uploadImageOnCloudinary(cloudinary, updateRegisteredTechnician.getImage());
             user.setImage(imageUrl);
         }
         if(updateRegisteredTechnician.getName()!=null){
             user.setImage(updateRegisteredTechnician.getName());
         }
         if(updateRegisteredTechnician.getPhone()!=null){
             user.setPhone(updateRegisteredTechnician.getPhone());
         }
         if (updateRegisteredTechnician.getSkill()!=null){
             user.getTechnician().setSkill(updateRegisteredTechnician.getSkill());
         }
        TechnicianResponse technicianResponse = UserMapper.toTechnicianResponse(user);
        SuccessTechnicianCreatedResponse response=new SuccessTechnicianCreatedResponse();
        response.setUser(technicianResponse);
        response.setStatus(HttpStatus.ACCEPTED.value());
        response.setMessage("Technician updated successfully");
        response.setSuccess(true);
        response.setTimeStamp(LocalDateTime.now());
        return response;
    }



    @Transactional
    public SuccessTenantCreatedResponse updateTenant(UpdateRegisteredTenant updateRegisteredTenant, String id) {
        User user=userRepository.findById(id).orElseThrow(()->new CustomException("User doesn't exist"));
        if(updateRegisteredTenant.getImage()!=null){
            user.setImage(UploadImage.uploadImageOnCloudinary(cloudinary, updateRegisteredTenant.getImage()));
        }
        if(updateRegisteredTenant.getCompanyName()!=null){
            user.getTenant().setCompanyName(updateRegisteredTenant.getCompanyName());
        }
        if(updateRegisteredTenant.getName()!=null){
            user.setName(updateRegisteredTenant.getName());
        }
        if(updateRegisteredTenant.getPhone()!=null){
            user.setPhone(updateRegisteredTenant.getPhone());
        }
        if(updateRegisteredTenant.getFloor()!=null){
            user.getTenant().setFloor(updateRegisteredTenant.getFloor().toString());
        }
        TenantResponse tenantResponse = UserMapper.toTenantResponse(user);
        SuccessTenantCreatedResponse response=new SuccessTenantCreatedResponse();
        response.setUser(tenantResponse);
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("Tenant updated successfully");
        response.setSuccess(true);
        response.setTimeStamp(LocalDateTime.now());
        return response;
    }
}
