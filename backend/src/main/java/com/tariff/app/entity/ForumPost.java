package com.tariff.app.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "forum_posts")
public class ForumPost {

	@Id
	@GeneratedValue
	@Column(name = "id", columnDefinition = "UUID")
	private UUID id;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "content", nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(name = "excerpt", columnDefinition = "TEXT")
	private String excerpt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id", nullable = false)
	private User author;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id", nullable = false)
	private ForumCategory category;

	@Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime createdAt;

	@Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime updatedAt;

	@Column(name = "last_activity_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime lastActivityAt;

	@Column(name = "view_count")
	private Integer viewCount = 0;

	@Column(name = "comment_count")
	private Integer commentCount = 0;

	@Column(name = "vote_count")
	private Integer voteCount = 0;

	@Column(name = "is_pinned")
	private Boolean isPinned = false;

	@Column(name = "is_locked")
	private Boolean isLocked = false;

	@Column(name = "is_deleted")
	private Boolean isDeleted = false;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ForumComment> comments = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ForumVote> votes = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ForumAttachment> attachments = new ArrayList<>();

	@PrePersist
	public void onCreate() {
		OffsetDateTime now = OffsetDateTime.now();
		this.createdAt = now;
		this.updatedAt = now;
		this.lastActivityAt = now;
		if (viewCount == null) viewCount = 0;
		if (commentCount == null) commentCount = 0;
		if (voteCount == null) voteCount = 0;
		if (isPinned == null) isPinned = false;
		if (isLocked == null) isLocked = false;
		if (isDeleted == null) isDeleted = false;
	}

	@PreUpdate
	public void onUpdate() {
		this.updatedAt = OffsetDateTime.now();
	}

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public String getExcerpt() { return excerpt; }
	public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
	public User getAuthor() { return author; }
	public void setAuthor(User author) { this.author = author; }
	public ForumCategory getCategory() { return category; }
	public void setCategory(ForumCategory category) { this.category = category; }
	public OffsetDateTime getCreatedAt() { return createdAt; }
	public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
	public OffsetDateTime getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
	public OffsetDateTime getLastActivityAt() { return lastActivityAt; }
	public void setLastActivityAt(OffsetDateTime lastActivityAt) { this.lastActivityAt = lastActivityAt; }
	public Integer getViewCount() { return viewCount; }
	public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }
	public Integer getCommentCount() { return commentCount; }
	public void setCommentCount(Integer commentCount) { this.commentCount = commentCount; }
	public Integer getVoteCount() { return voteCount; }
	public void setVoteCount(Integer voteCount) { this.voteCount = voteCount; }
	public Boolean getIsPinned() { return isPinned; }
	public void setIsPinned(Boolean isPinned) { this.isPinned = isPinned; }
	public Boolean getIsLocked() { return isLocked; }
	public void setIsLocked(Boolean isLocked) { this.isLocked = isLocked; }
	public Boolean getIsDeleted() { return isDeleted; }
	public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }
	public List<ForumComment> getComments() { return comments; }
	public void setComments(List<ForumComment> comments) { this.comments = comments; }
	public List<ForumVote> getVotes() { return votes; }
	public void setVotes(List<ForumVote> votes) { this.votes = votes; }
	public List<ForumAttachment> getAttachments() { return attachments; }
	public void setAttachments(List<ForumAttachment> attachments) { this.attachments = attachments; }
}


