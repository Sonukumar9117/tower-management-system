package com.towerManagementSystem.tower.dto;

import com.towerManagementSystem.tower.modal.Comment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SuccessCommentResponse extends SuccessResponse{
    List<Comment> comments;
}
