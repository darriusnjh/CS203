package com.tariff.app.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "forum_categories")
public class ForumCategory {

	@Id
	@GeneratedValue
	@Column(name = "id", columnDefinition = "UUID")
	private UUID id;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "color")
	private String color;

	@Column(name = "icon")
	private String icon;

	@Column(name = "sort_order")
	private Integer sortOrder = 0;

	@Column(name = "is_active")
	private Boolean isActive = true;

	@Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime createdAt;

	@Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime updatedAt;

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = false)
	private List<ForumPost> posts = new ArrayList<>();

	@PrePersist
	public void onCreate() {
		OffsetDateTime now = OffsetDateTime.now();
		this.createdAt = now;
		this.updatedAt = now;
		if (isActive == null) isActive = true;
		if (sortOrder == null) sortOrder = 0;
	}

	@PreUpdate
	public void onUpdate() {
		this.updatedAt = OffsetDateTime.now();
	}

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }
	public String getColor() { return color; }
	public void setColor(String color) { this.color = color; }
	public String getIcon() { return icon; }
	public void setIcon(String icon) { this.icon = icon; }
	public Integer getSortOrder() { return sortOrder; }
	public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
	public Boolean getIsActive() { return isActive; }
	public void setIsActive(Boolean isActive) { this.isActive = isActive; }
	public OffsetDateTime getCreatedAt() { return createdAt; }
	public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
	public OffsetDateTime getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
	public List<ForumPost> getPosts() { return posts; }
	public void setPosts(List<ForumPost> posts) { this.posts = posts; }
}


