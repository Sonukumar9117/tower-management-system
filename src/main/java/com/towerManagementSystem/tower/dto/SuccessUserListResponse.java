package com.towerManagementSystem.tower.dto;

import com.towerManagementSystem.tower.dto.Resposne.Pagination;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SuccessUserListResponse extends SuccessResponse{
    List<UserResponseDto>users;
    Pagination pagination;
}