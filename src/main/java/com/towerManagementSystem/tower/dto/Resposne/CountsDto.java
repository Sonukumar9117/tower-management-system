package com.towerManagementSystem.tower.dto.Resposne;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CountsDto {
    private Long pending;
    private Long inProgress;
    private Long resolved;
}
