package com.towerManagementSystem.tower.respository;

import com.towerManagementSystem.tower.domain.ComplaintStatus;
import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.Resposne.CountNumberComplainByStatus;
import com.towerManagementSystem.tower.modal.Complaint;
import com.towerManagementSystem.tower.modal.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint,String> {
    Page<Complaint> findByComplaintStatus(Pageable pageable, ComplaintStatus complaintStatus);
    @Query(
            value = """
                    SELECT
                        SUM(CASE WHEN c.complaintStatus='PENDING' THEN 1 ELSE 0 END ) as pending,
                        SUM (CASE WHEN c.complaintStatus='RESOLVED' THEN 1 ELSE 0 END ) as resolved,
                        SUM (CASE WHEN c.complaintStatus='IN_PROGRESS' THEN 1 ELSE 0 END ) as inProgress
                    from Complaint as c
                    """
    )
    CountNumberComplainByStatus findNumberComplaint();

}
