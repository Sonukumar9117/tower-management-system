package com.towerManagementSystem.tower.controller;

import com.towerManagementSystem.tower.dto.SuccessPostResponse;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.dto.request.PostDto;
import com.towerManagementSystem.tower.modal.Post;
import com.towerManagementSystem.tower.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;



@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/post")
public class PostController {
    private final PostService postService;
    @PostMapping("/create-post")
    public ResponseEntity<?>createPost(@ModelAttribute PostDto postDto){
        SuccessResponse successResponse=postService.createPost(postDto);
        return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
    }
    @GetMapping("/list")
    public ResponseEntity<?>getPost(@RequestParam (value = "page", defaultValue = "0") Integer page, @RequestParam(value = "limit", defaultValue = "20") Integer limit){
        SuccessPostResponse postResponse=postService.getPost(page, limit);
        return ResponseEntity.ok(postResponse);
    }

    public ResponseEntity<?>updatePost(){
        return ResponseEntity.ok("");
    }
    public ResponseEntity<?>getPostById(){
        return ResponseEntity.ok("");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>deletePostById(@PathVariable("id") String id){
        SuccessResponse successResponse=postService.deleteById(id);
        return ResponseEntity.ok(successResponse);
    }
}
