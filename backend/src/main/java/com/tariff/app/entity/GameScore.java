package com.tariff.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "game_scores", 
       indexes = {
           @Index(name = "idx_game_scores_user_id", columnList = "user_id"),
           @Index(name = "idx_game_scores_game_type", columnList = "game_type"),
           @Index(name = "idx_game_scores_created_at", columnList = "created_at"),
           @Index(name = "idx_game_scores_score", columnList = "score DESC")
       })
public class GameScore {
    @Id
    @UuidGenerator
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User is required")
    private User user;

    @Column(name = "game_type", nullable = false, length = 50)
    @NotNull(message = "Game type is required")
    private String gameType;

    @Column(name = "score", nullable = false)
    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score must be non-negative")
    @Max(value = 10000, message = "Score must not exceed 10000")
    private Integer score;

    @Column(name = "max_score")
    @Min(value = 0, message = "Max score must be non-negative")
    private Integer maxScore;

    @Column(name = "time_spent")
    @Min(value = 0, message = "Time spent must be non-negative")
    private Integer timeSpent; // in seconds

    @Column(name = "moves_used")
    @Min(value = 0, message = "Moves used must be non-negative")
    private Integer movesUsed;

    @Column(name = "perfect_score")
    @NotNull(message = "Perfect score flag is required")
    private Boolean perfectScore = false;

    @Column(name = "points_earned")
    @Min(value = 0, message = "Points earned must be non-negative")
    private Integer pointsEarned;

    @Column(name = "game_data", columnDefinition = "TEXT")
    private String gameData; // JSON string for game-specific data

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public GameScore() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public GameScore(User user, String gameType, Integer score, Integer pointsEarned) {
        this();
        this.user = user;
        this.gameType = gameType;
        this.score = score;
        this.pointsEarned = pointsEarned;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getGameType() {
        return gameType;
    }

    public void setGameType(String gameType) {
        this.gameType = gameType;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
    }

    public Integer getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(Integer timeSpent) {
        this.timeSpent = timeSpent;
    }

    public Integer getMovesUsed() {
        return movesUsed;
    }

    public void setMovesUsed(Integer movesUsed) {
        this.movesUsed = movesUsed;
    }

    public Boolean getPerfectScore() {
        return perfectScore;
    }

    public void setPerfectScore(Boolean perfectScore) {
        this.perfectScore = perfectScore;
    }

    public Integer getPointsEarned() {
        return pointsEarned;
    }

    public void setPointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public String getGameData() {
        return gameData;
    }

    public void setGameData(String gameData) {
        this.gameData = gameData;
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

    @PostLoad
    protected void onLoad() {
        // Log entity loading for debugging
        System.out.println("GameScore loaded: " + this.id + " for user: " + 
                          (this.user != null ? this.user.getUsername() : "unknown"));
    }

    @PostPersist
    protected void onPersist() {
        // Log new score creation
        System.out.println("New GameScore created: " + this.id + " with score: " + this.score);
    }

    @PostUpdate
    protected void onPostUpdate() {
        // Log score updates
        System.out.println("GameScore updated: " + this.id);
    }

    @PostRemove
    protected void onRemove() {
        // Log score deletion
        System.out.println("GameScore deleted: " + this.id);
    }
}
