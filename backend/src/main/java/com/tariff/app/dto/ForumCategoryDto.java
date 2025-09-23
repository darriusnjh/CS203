package com.tariff.app.dto;

import java.util.UUID;

public class ForumCategoryDto {

	private UUID id;
	private String name;
	private String description;
	private String color;
	private String icon;

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
}


