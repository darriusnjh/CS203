package com.tariff.app.repository;

import com.tariff.app.entity.ForumComment;
import com.tariff.app.entity.ForumPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ForumCommentRepository extends JpaRepository<ForumComment, UUID> {

    @Query("SELECT c FROM ForumComment c WHERE c.post = :post AND c.isDeleted = false ORDER BY c.createdAt ASC")
    Page<ForumComment> findByPostOrdered(@Param("post") ForumPost post, Pageable pageable);
}


