package com.tariff.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "daily_tasks",
       indexes = {
           @Index(name = "idx_daily_tasks_date", columnList = "task_date"),
           @Index(name = "idx_daily_tasks_type", columnList = "task_type"),
           @Index(name = "idx_daily_tasks_active", columnList = "is_active")
       })
public class DailyTask {
    @Id
    @UuidGenerator
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "task_id", nullable = false, unique = true, length = 50)
    @NotNull(message = "Task ID is required")
    @Size(max = 50, message = "Task ID must not exceed 50 characters")
    private String taskId;

    @Column(name = "title", nullable = false, length = 200)
    @NotNull(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @Column(name = "category", nullable = false, length = 50)
    @NotNull(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    private String category;

    @Column(name = "points", nullable = false)
    @NotNull(message = "Points is required")
    @Min(value = 0, message = "Points must be non-negative")
    @Max(value = 1000, message = "Points must not exceed 1000")
    private Integer points;

    @Column(name = "difficulty", nullable = false, length = 20)
    @NotNull(message = "Difficulty is required")
    @Size(max = 20, message = "Difficulty must not exceed 20 characters")
    private String difficulty;

    @Column(name = "max_progress", nullable = false)
    @NotNull(message = "Max progress is required")
    @Min(value = 1, message = "Max progress must be at least 1")
    @Max(value = 100, message = "Max progress must not exceed 100")
    private Integer maxProgress;

    @Column(name = "reward")
    private String reward;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    @Column(name = "task_type", nullable = false, length = 50)
    @NotNull(message = "Task type is required")
    @Size(max = 50, message = "Task type must not exceed 50 characters")
    private String taskType;

    @Column(name = "task_date", nullable = false)
    @NotNull(message = "Task date is required")
    private LocalDate taskDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public DailyTask() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public DailyTask(String taskId, String title, String description, String category, 
                    Integer points, String difficulty, Integer maxProgress) {
        this();
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.points = points;
        this.difficulty = difficulty;
        this.maxProgress = maxProgress;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getMaxProgress() {
        return maxProgress;
    }

    public void setMaxProgress(Integer maxProgress) {
        this.maxProgress = maxProgress;
    }

    public String getReward() {
        return reward;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public LocalDate getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(LocalDate taskDate) {
        this.taskDate = taskDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
