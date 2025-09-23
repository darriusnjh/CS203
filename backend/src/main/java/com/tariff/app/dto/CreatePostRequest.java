package com.tariff.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public class CreatePostRequest {

	@NotBlank(message = "Title is required")
	@Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
	private String title;

	@NotBlank(message = "Content is required")
	@Size(min = 5, max = 10000, message = "Content must be between 5 and 10000 characters")
	private String content;

	private UUID categoryId;

	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public UUID getCategoryId() { return categoryId; }
	public void setCategoryId(UUID categoryId) { this.categoryId = categoryId; }
}


