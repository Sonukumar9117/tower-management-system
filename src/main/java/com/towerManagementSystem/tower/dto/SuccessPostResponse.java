package com.towerManagementSystem.tower.dto;

import com.towerManagementSystem.tower.dto.Resposne.Pagination;
import com.towerManagementSystem.tower.dto.Resposne.PostResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuccessPostResponse extends SuccessResponse{
    List<PostResponse> posts;
    Pagination pagination;
}
