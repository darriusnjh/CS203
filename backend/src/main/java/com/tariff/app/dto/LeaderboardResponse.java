package com.tariff.app.dto;

import java.time.LocalDateTime;

public class LeaderboardResponse {
    private Long userId;
    private String username;
    private String email;
    private String gameType;
    private Integer score;
    private Integer pointsEarned;
    private Boolean perfectScore;
    private LocalDateTime createdAt;

    // Constructors
    public LeaderboardResponse() {}

    public LeaderboardResponse(Long userId, String username, String gameType, Integer score) {
        this.userId = userId;
        this.username = username;
        this.gameType = gameType;
        this.score = score;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Integer getPointsEarned() {
        return pointsEarned;
    }

    public void setPointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public Boolean getPerfectScore() {
        return perfectScore;
    }

    public void setPerfectScore(Boolean perfectScore) {
        this.perfectScore = perfectScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
