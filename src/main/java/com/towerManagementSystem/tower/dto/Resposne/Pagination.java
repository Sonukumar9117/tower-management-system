package com.towerManagementSystem.tower.dto.Resposne;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Pagination {
    private int currentPage;
    private int totalPage;
    private int limit;
}
