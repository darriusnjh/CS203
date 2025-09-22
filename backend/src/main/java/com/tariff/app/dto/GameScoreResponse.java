package com.tariff.app.dto;

import java.time.LocalDateTime;

public class GameScoreResponse {
    private Long id;
    private String gameType;
    private Integer score;
    private Integer maxScore;
    private Integer timeSpent;
    private Integer movesUsed;
    private Boolean perfectScore;
    private Integer pointsEarned;
    private String gameData;
    private LocalDateTime createdAt;

    // Constructors
    public GameScoreResponse() {}

    public GameScoreResponse(Long id, String gameType, Integer score, Integer pointsEarned) {
        this.id = id;
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
}
