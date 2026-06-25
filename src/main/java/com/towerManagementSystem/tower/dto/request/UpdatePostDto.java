package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UpdatePostDto {
    @Size(min = 10, message = "Length of title must be greater than 10 characters")
    private String title;
    @Size(min = 10, message = "Length of description must be greater than 100 characters")
    private String description;
    private List<MultipartFile> images = new ArrayList<>();
}
