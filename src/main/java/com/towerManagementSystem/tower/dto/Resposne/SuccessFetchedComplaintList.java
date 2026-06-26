package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.modal.Complaint;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SuccessFetchedComplaintList extends SuccessResponse {
    List<ComplaintResponse> complaints;
    Pagination pagination;
}
