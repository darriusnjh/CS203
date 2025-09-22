package com.tariff.app.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Min;

public class GameScoreRequest {
    @NotNull(message = "Game type is required")
    private String gameType;

    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score must be non-negative")
    private Integer score;

    private Integer maxScore;
    private Integer timeSpent; // in seconds
    private Integer movesUsed;
    private Boolean perfectScore = false;
    private Integer pointsEarned;
    private String gameData; // JSON string for game-specific data

    // Constructors
    public GameScoreRequest() {}

    public GameScoreRequest(String gameType, Integer score, Integer pointsEarned) {
        this.gameType = gameType;
        this.score = score;
        this.pointsEarned = pointsEarned;
    }

    // Getters and Setters
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
}
