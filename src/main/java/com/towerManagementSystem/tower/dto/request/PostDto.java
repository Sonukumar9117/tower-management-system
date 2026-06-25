package com.towerManagementSystem.tower.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostDto {
        @NotBlank(message = "Title is required filed.")
        @Size(min = 10, message = "Length of title must be greater than 10 characters")
        private String title;
        @NotBlank(message = "Description is required filed.")
        @Size(min = 10, message = "Length of description must be greater than 100 characters")
        private String description;
        private List<MultipartFile> images=new ArrayList<>();
}
