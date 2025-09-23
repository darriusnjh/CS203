package com.tariff.app.repository;

import com.tariff.app.entity.ForumPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, UUID> {

    @Query("SELECT fp FROM ForumPost fp WHERE fp.isDeleted = false ORDER BY fp.isPinned DESC, fp.lastActivityAt DESC")
    Page<ForumPost> findAllActiveOrdered(Pageable pageable);

    @Query("SELECT fp FROM ForumPost fp WHERE fp.category.id = :categoryId AND fp.isDeleted = false ORDER BY fp.isPinned DESC, fp.lastActivityAt DESC")
    Page<ForumPost> findByCategoryIdOrdered(@Param("categoryId") UUID categoryId, Pageable pageable);

    @Query("SELECT fp FROM ForumPost fp WHERE fp.isDeleted = false AND (LOWER(fp.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(fp.content) LIKE LOWER(CONCAT('%', :query, '%'))) ORDER BY fp.lastActivityAt DESC")
    Page<ForumPost> searchPosts(@Param("query") String query, Pageable pageable);

    Optional<ForumPost> findByIdAndIsDeletedFalse(UUID id);
}


