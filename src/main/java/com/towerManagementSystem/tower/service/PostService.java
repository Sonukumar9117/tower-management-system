package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.dto.Resposne.*;
import com.towerManagementSystem.tower.dto.SuccessPostResponse;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.request.PostDto;
import com.towerManagementSystem.tower.dto.request.UpdatePostDto;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.mapper.PostMapper;
import com.towerManagementSystem.tower.modal.Admin;
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
    public SuccessPostCreatedResponse createPost(PostDto postDto){
        List<MultipartFile> images=postDto.getImages();
        List<String>fileName=new ArrayList<>();
        User user=(User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        assert user != null;
        Admin admin=user.getAdmin();
        for(int i=0;i<images.size();i++){
            fileName.add(UUID.randomUUID()+".png");
        }
        Post post=Post.builder()
                .title(postDto.getTitle())
                .createdAt(LocalDateTime.now())
                .description(postDto.getDescription())
                .images(fileName)
                .createdBy(admin)
                .build();
                postRepository.save(post);
                List<Post>posts=admin.getPosts();
        posts.add(post);
        admin.setPosts(posts);
        for(int i=0;i<images.size();i++){
            UploadImage.uploadImage(images.get(i),fileName.get(i) );
        }
        SuccessPostCreatedResponse successPostCreatedResponse=new SuccessPostCreatedResponse();
             successPostCreatedResponse.setPost(PostMapper.toPostResponse(post));
             successPostCreatedResponse.setMessage("Post created successfully");
             successPostCreatedResponse.setTimeStamp(LocalDateTime.now());
             successPostCreatedResponse.setSuccess(true);
             successPostCreatedResponse.setStatus(HttpStatus.CREATED.value());
        return successPostCreatedResponse;
    }

    public SuccessPostResponse getPost(int page , int limit) {
        Pageable paging=  PageRequest.of(page,limit, Sort.by("createdAt").descending());
        Page<Post> postPage=postRepository.findAll(paging);
        Pagination pagination=Pagination.builder()
                .currentPage(postPage.getNumber())
                .limit(postPage.getSize())
                .totalPage(postPage.getTotalPages())
                .build();
        List<Post> post= postPage.getContent();
        List<PostResponse> postResponseList=new ArrayList<>();
        post.forEach( (post1 -> {
            postResponseList.add(PostMapper.toPostResponse(post1));
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
        Admin user= post.getCreatedBy();
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

    @Transactional
    public SuccessPostUpdateResponse updatePostById(String postId, UpdatePostDto postDto){
      Post post= postRepository.findById(postId).orElseThrow(()->new CustomException("Post doesn't exist"));
      if(postDto.getDescription()!=null){
          post.setDescription(postDto.getDescription());
          post.setUpdatedAt(LocalDateTime.now());
      }
      if(postDto.getTitle()!=null){
          post.setTitle(postDto.getTitle());
          post.setUpdatedAt(LocalDateTime.now());
      }
      if(postDto.getImages()!=null && !postDto.getImages().isEmpty()){
          List<String>fileName=new ArrayList<>();
          for(int i=0;i<postDto.getImages().size();i++){
              fileName.add(UUID.randomUUID()+".png");
          }
          post.setImages(fileName);
          for(int i=0;i<fileName.size();i++){
              UploadImage.uploadImage(postDto.getImages().get(i),fileName.get(i));
          }
          post.setUpdatedAt(LocalDateTime.now());
      }
       SuccessPostUpdateResponse postUpdateResponse=new SuccessPostUpdateResponse();
       postUpdateResponse.setPost(PostMapper.toPostResponse(post));
       postUpdateResponse.setStatus(HttpStatus.OK.value());
       postUpdateResponse.setMessage("Post updated successfully");
       postUpdateResponse.setSuccess(true);
       postUpdateResponse.setTimeStamp(LocalDateTime.now());
      return postUpdateResponse;
    }
}
