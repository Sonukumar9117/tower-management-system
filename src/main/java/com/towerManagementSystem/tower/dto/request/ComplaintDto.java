package com.towerManagementSystem.tower.dto.request;

import com.towerManagementSystem.tower.domain.ConcernedDepartment;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ComplaintDto {
    @NotBlank(message = "Title is required filed.")
    @Size(min = 10, message = "Length of title must be greater than 10 characters")
    private String title;
    @NotBlank(message = "Description is required filed.")
    @Size(min = 10, message = "Length of description must be greater than 100 characters")
    private String description;
    @NotNull(message = "Days facing issue can't be null")
    public Integer daysFacingIssue;
    @NotBlank(message = "Building can't be null")
    private String building;
    @NotNull(message = "Concerned department is required field.")
    private ConcernedDepartment concernedDepartment;
    private List<MultipartFile> images=new ArrayList<>();
}
