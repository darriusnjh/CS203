package com.tariff.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public class CreateCommentRequest {

	@NotBlank(message = "Content is required")
	@Size(min = 1, max = 5000, message = "Content must be between 1 and 5000 characters")
	private String content;

	private UUID parentCommentId;

	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public UUID getParentCommentId() { return parentCommentId; }
	public void setParentCommentId(UUID parentCommentId) { this.parentCommentId = parentCommentId; }
}


