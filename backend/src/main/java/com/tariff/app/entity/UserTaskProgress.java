package com.tariff.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_task_progress",
       indexes = {
           @Index(name = "idx_user_task_progress_user_id", columnList = "user_id"),
           @Index(name = "idx_user_task_progress_task_id", columnList = "task_id"),
           @Index(name = "idx_user_task_progress_date", columnList = "task_date"),
           @Index(name = "idx_user_task_progress_completed", columnList = "completed")
       },
       uniqueConstraints = {
           @UniqueConstraint(name = "uk_user_task_progress_user_task_date", 
                           columnNames = {"user_id", "task_id", "task_date"})
       })
public class UserTaskProgress {
    @Id
    @UuidGenerator
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_task_progress_user"))
    @NotNull(message = "User is required")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "task_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_task_progress_task"))
    @NotNull(message = "Task is required")
    private DailyTask task;

    @Column(name = "progress", nullable = false)
    @NotNull(message = "Progress is required")
    @Min(value = 0, message = "Progress must be non-negative")
    private Integer progress = 0;

    @Column(name = "completed", nullable = false)
    @NotNull(message = "Completed flag is required")
    private Boolean completed = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "points_earned")
    @Min(value = 0, message = "Points earned must be non-negative")
    private Integer pointsEarned = 0;

    @Column(name = "task_date", nullable = false)
    @NotNull(message = "Task date is required")
    private LocalDate taskDate;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public UserTaskProgress() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.taskDate = LocalDate.now();
    }

    public UserTaskProgress(User user, DailyTask task) {
        this();
        this.user = user;
        this.task = task;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public DailyTask getTask() {
        return task;
    }

    public void setTask(DailyTask task) {
        this.task = task;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
        if (completed && this.completedAt == null) {
            this.completedAt = LocalDateTime.now();
        }
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Integer getPointsEarned() {
        return pointsEarned;
    }

    public void setPointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public LocalDate getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(LocalDate taskDate) {
        this.taskDate = taskDate;
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
