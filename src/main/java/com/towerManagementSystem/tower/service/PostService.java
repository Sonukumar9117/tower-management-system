package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.dto.Resposne.Pagination;
import com.towerManagementSystem.tower.dto.Resposne.PostResponse;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.dto.SuccessPostResponse;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.request.PostDto;
import com.towerManagementSystem.tower.modal.Post;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.respository.PostRepository;
import com.towerManagementSystem.tower.utils.UploadImage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    @Transactional
    public SuccessResponse createPost(PostDto postDto){
        List<MultipartFile> images=postDto.getImages();
        List<String>fileName=new ArrayList<>();
        User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        for(int i=0;i<images.size();i++){
            fileName.add(UUID.randomUUID()+".png");
        }
        Post post=Post.builder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                .images(fileName)
                .createdBy(user)
                .build();
        postRepository.save(post);
        assert user != null;
        List<Post>posts=user.getPosts();
        posts.add(post);
        user.setPosts(posts);
        for(int i=0;i<images.size();i++){
            UploadImage.uploadImage(images.get(i),fileName.get(i) );
        }
        return SuccessResponse.builder()
                .message("Post created successfully")
                .status(HttpStatus.CREATED.value())
                .success(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    public SuccessPostResponse getPost(int page , int limit) {
        Pageable paging=  PageRequest.of(page,limit, Sort.by("createdAt").ascending());
        Page<Post> postPage=postRepository.findAll(paging);

        Pagination pagination=Pagination.builder()
                .currentPage(postPage.getNumber())
                .limit(postPage.getSize())
                .totalPage(postPage.getTotalPages())
                .build();
        List<Post> post= postPage.getContent();
        List<PostResponse> postResponseList=new ArrayList<>();
        post.forEach( (post1 -> {
            User user=post1.getCreatedBy();
            UserResponseDto userResponseDto=UserResponseDto.builder()
                    .id(user.getUserId())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .phone(user.getPhone())
                    .image(UploadImage.generateImageUrl(user.getImage()))
                    .build();
            List<String>imageUrl=new ArrayList<>();
            post1.getImages().forEach(imageName->{
                imageUrl.add(UploadImage.generateImageUrl(imageName));
            });
            PostResponse postResponse=PostResponse.builder()
                    .title(post1.getTitle())
                    .description(post1.getDescription())
                    .id(post1.getPostId())
                    .images(imageUrl)
                    .createdAt(post1.getCreatedAt())
                    .updatedAt(post1.getUpdatedAt())
                    .createdBy(userResponseDto)
                    .build();
            postResponseList.add(postResponse);
        }));
        SuccessPostResponse successPostResponse=new SuccessPostResponse();
        successPostResponse.setPosts(postResponseList);
        successPostResponse.setSuccess(true);
        successPostResponse.setPagination(pagination);
        successPostResponse.setStatus(HttpStatus.OK.value());
        successPostResponse.setTimeStamp(LocalDateTime.now());
        successPostResponse.setMessage("Post fetched successfully.");
        return successPostResponse;
    }

    public SuccessResponse deleteById(String  id) {
        Post post=postRepository.findById(id).orElseThrow(()->new UsernameNotFoundException("Post not found"));
        User user=post.getCreatedBy();
        user.getPosts().remove(post);

        postRepository.save(post);
        postRepository.deleteById(id);
        return SuccessResponse.builder()
                .message("Post deleted successfully.")
                .success(true)
                .timeStamp(LocalDateTime.now())
                .success(true)
                .status(HttpStatus.OK.value())
                .build();
    }
}
