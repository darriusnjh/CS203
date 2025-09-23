package com.tariff.app.repository;

import com.tariff.app.entity.ForumCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory, UUID> {

    @Query("SELECT fc FROM ForumCategory fc WHERE fc.isActive = true ORDER BY fc.sortOrder ASC")
    List<ForumCategory> findAllActiveOrdered();

    Optional<ForumCategory> findByName(String name);
}


