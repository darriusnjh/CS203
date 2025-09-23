package com.tariff.app.repository;

import com.tariff.app.entity.ForumVote;
import com.tariff.app.entity.ForumPost;
import com.tariff.app.entity.ForumComment;
import com.tariff.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ForumVoteRepository extends JpaRepository<ForumVote, UUID> {
    long countByPostAndIsUpvoteTrue(ForumPost post);
    long countByCommentAndIsUpvoteTrue(ForumComment comment);
    Optional<ForumVote> findByPostAndUser(ForumPost post, User user);
    Optional<ForumVote> findByCommentAndUser(ForumComment comment, User user);
}


