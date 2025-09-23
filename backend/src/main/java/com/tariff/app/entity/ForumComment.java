package com.tariff.app.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "forum_comments")
public class ForumComment {

	@Id
	@GeneratedValue
	@Column(name = "id", columnDefinition = "UUID")
	private UUID id;

	@Column(name = "content", nullable = false, columnDefinition = "TEXT")
	private String content;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id", nullable = false)
	private ForumPost post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id", nullable = false)
	private User author;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_comment_id")
	private ForumComment parentComment;

	@Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime createdAt;

	@Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime updatedAt;

	@Column(name = "vote_count")
	private Integer voteCount = 0;

	@Column(name = "is_deleted")
	private Boolean isDeleted = false;

	@PrePersist
	public void onCreate() {
		OffsetDateTime now = OffsetDateTime.now();
		this.createdAt = now;
		this.updatedAt = now;
		if (voteCount == null) voteCount = 0;
		if (isDeleted == null) isDeleted = false;
	}

	@PreUpdate
	public void onUpdate() { this.updatedAt = OffsetDateTime.now(); }

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public ForumPost getPost() { return post; }
	public void setPost(ForumPost post) { this.post = post; }
	public User getAuthor() { return author; }
	public void setAuthor(User author) { this.author = author; }
	public ForumComment getParentComment() { return parentComment; }
	public void setParentComment(ForumComment parentComment) { this.parentComment = parentComment; }
	public OffsetDateTime getCreatedAt() { return createdAt; }
	public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
	public OffsetDateTime getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
	public Integer getVoteCount() { return voteCount; }
	public void setVoteCount(Integer voteCount) { this.voteCount = voteCount; }
	public Boolean getIsDeleted() { return isDeleted; }
	public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }
}


