package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.modal.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User>findByPhone(String phone);
    Page<User> findUserByRole(Pageable pageable, UserRole userRole);
}
