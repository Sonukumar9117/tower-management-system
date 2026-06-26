package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessPostCreatedResponse extends SuccessResponse {
    private PostResponse post;
}
