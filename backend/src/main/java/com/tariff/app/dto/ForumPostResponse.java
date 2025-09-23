package com.tariff.app.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public class ForumPostResponse {

	private UUID id;
	private String title;
	private String content;
	private String excerpt;
	private SimpleUserDto author;
	private ForumCategoryDto category;
	private OffsetDateTime createdAt;
	private OffsetDateTime updatedAt;
	private OffsetDateTime lastActivityAt;
	private Integer viewCount;
	private Integer commentCount;
	private Integer voteCount;
	private Boolean isPinned;
	private Boolean isLocked;

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public String getExcerpt() { return excerpt; }
	public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
	public SimpleUserDto getAuthor() { return author; }
	public void setAuthor(SimpleUserDto author) { this.author = author; }
	public ForumCategoryDto getCategory() { return category; }
	public void setCategory(ForumCategoryDto category) { this.category = category; }
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
}


