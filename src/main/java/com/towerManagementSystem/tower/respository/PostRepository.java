package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.modal.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PostRepository extends JpaRepository<Post, String> {
}
