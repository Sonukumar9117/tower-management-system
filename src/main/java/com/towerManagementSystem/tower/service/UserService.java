package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.Resposne.Pagination;
import com.towerManagementSystem.tower.dto.Resposne.TechnicianResponse;
import com.towerManagementSystem.tower.dto.Resposne.TenantResponse;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.SuccessUserListResponse;
import com.towerManagementSystem.tower.dto.request.ChangePasswordRequestDto;
import com.towerManagementSystem.tower.exception.CustomException;
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
    public SuccessResponse deleteUserById(String userId){
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
        List<User>userList=userPage.getContent();
        List<UserResponseDto>users=new ArrayList<>();
        if(userRole==UserRole.TECHNICIAN){
            userList.forEach(user->{
                TechnicianResponse technicianResponse=new TechnicianResponse();
                technicianResponse.setName(user.getName());
                technicianResponse.setImage(user.getImage());
                technicianResponse.setEmail(user.getEmail());
                technicianResponse.setPhone(user.getPhone());
                technicianResponse.setId(user.getUserId());
                technicianResponse.setRole(user.getRole());
                technicianResponse.setSkill(user.getTechnician().getSkill());
                technicianResponse.setExperience(user.getTechnician().getExperience().toString());
                users.add(technicianResponse);
            });
        }
        else if(userRole==UserRole.TENANT){
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
}
