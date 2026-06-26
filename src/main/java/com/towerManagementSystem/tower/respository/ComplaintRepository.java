package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.modal.Complaint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint,String> {
    Page<Complaint> findByComplaintStatus(Pageable pageable, ComplaintStatus complaintStatus);
}
