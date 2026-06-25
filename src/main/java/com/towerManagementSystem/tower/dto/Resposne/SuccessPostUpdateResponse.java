package com.towerManagementSystem.tower.dto.Resposne;

import com.towerManagementSystem.tower.dto.SuccessResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuccessPostUpdateResponse extends SuccessResponse {
   PostResponse post;
}
