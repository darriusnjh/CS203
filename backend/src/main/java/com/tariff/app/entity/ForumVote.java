package com.tariff.app.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "forum_votes")
public class ForumVote {

	@Id
	@GeneratedValue
	@Column(name = "id", columnDefinition = "UUID")
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private ForumPost post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "comment_id")
	private ForumComment comment;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "is_upvote")
	private Boolean isUpvote = true;

	@Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime createdAt;

	@PrePersist
	public void onCreate() { this.createdAt = OffsetDateTime.now(); }

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public ForumPost getPost() { return post; }
	public void setPost(ForumPost post) { this.post = post; }
	public ForumComment getComment() { return comment; }
	public void setComment(ForumComment comment) { this.comment = comment; }
	public User getUser() { return user; }
	public void setUser(User user) { this.user = user; }
	public Boolean getIsUpvote() { return isUpvote; }
	public void setIsUpvote(Boolean isUpvote) { this.isUpvote = isUpvote; }
	public OffsetDateTime getCreatedAt() { return createdAt; }
	public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}


