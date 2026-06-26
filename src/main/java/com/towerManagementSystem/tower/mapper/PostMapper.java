package com.towerManagementSystem.tower.mapper;

import com.towerManagementSystem.tower.dto.Resposne.PostResponse;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.modal.Admin;
import com.towerManagementSystem.tower.modal.Post;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.utils.UploadImage;

import java.util.ArrayList;
import java.util.List;

public class PostMapper {
    public static PostResponse toPostResponse(Post post){
        List<String> imageUrl=new ArrayList<>();
        post.getImages().forEach(imageName->{
            imageUrl.add(UploadImage.generateImageUrl(imageName));
        });
        Admin admin= post.getCreatedBy();
        User user=admin.getUser();
        UserResponseDto userResponseDto=UserResponseDto.builder()
                .id(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .phone(user.getPhone())
                .image(UploadImage.generateImageUrl(user.getImage()))
                .build();
        return PostResponse.builder()
                .title(post.getTitle())
                .description(post.getDescription())
                .id(post.getPostId())
                .images(imageUrl)
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .createdBy(userResponseDto)
                .build();
    }
}
