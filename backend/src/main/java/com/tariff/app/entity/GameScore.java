package com.tariff.app.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_scores")
public class GameScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "game_type", nullable = false)
    private String gameType;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "max_score")
    private Integer maxScore;

    @Column(name = "time_spent")
    private Integer timeSpent; // in seconds

    @Column(name = "moves_used")
    private Integer movesUsed;

    @Column(name = "perfect_score")
    private Boolean perfectScore = false;

    @Column(name = "points_earned")
    private Integer pointsEarned;

    @Column(name = "game_data", columnDefinition = "TEXT")
    private String gameData; // JSON string for game-specific data

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
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
}
