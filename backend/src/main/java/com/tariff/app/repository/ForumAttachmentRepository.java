package com.tariff.app.repository;

import com.tariff.app.entity.ForumAttachment;
import com.tariff.app.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ForumAttachmentRepository extends JpaRepository<ForumAttachment, UUID> {
    List<ForumAttachment> findByPost(ForumPost post);
}


