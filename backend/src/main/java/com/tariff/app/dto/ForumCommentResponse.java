package com.tariff.app.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public class ForumCommentResponse {

	private UUID id;
	private String content;
	private SimpleUserDto author;
	private UUID parentCommentId;
	private OffsetDateTime createdAt;
	private OffsetDateTime updatedAt;
	private Integer voteCount;

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public SimpleUserDto getAuthor() { return author; }
	public void setAuthor(SimpleUserDto author) { this.author = author; }
	public UUID getParentCommentId() { return parentCommentId; }
	public void setParentCommentId(UUID parentCommentId) { this.parentCommentId = parentCommentId; }
	public OffsetDateTime getCreatedAt() { return createdAt; }
	public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
	public OffsetDateTime getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
	public Integer getVoteCount() { return voteCount; }
	public void setVoteCount(Integer voteCount) { this.voteCount = voteCount; }
}
