package com.tariff.app.service;

import com.tariff.app.dto.GameScoreRequest;
import com.tariff.app.dto.GameScoreResponse;
import com.tariff.app.dto.LeaderboardResponse;
import com.tariff.app.entity.GameScore;
import com.tariff.app.entity.User;
import com.tariff.app.repository.GameScoreRepository;
import com.tariff.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class GameService {

    @Autowired
    private GameScoreRepository gameScoreRepository;

    @Autowired
    private UserRepository userRepository;

    public GameScoreResponse saveGameScore(GameScoreRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GameScore gameScore = new GameScore();
        gameScore.setUser(user);
        gameScore.setGameType(request.getGameType());
        gameScore.setScore(request.getScore());
        gameScore.setMaxScore(request.getMaxScore());
        gameScore.setTimeSpent(request.getTimeSpent());
        gameScore.setMovesUsed(request.getMovesUsed());
        gameScore.setPerfectScore(request.getPerfectScore());
        gameScore.setPointsEarned(request.getPointsEarned());
        gameScore.setGameData(request.getGameData());

        GameScore savedScore = gameScoreRepository.save(gameScore);

        return convertToResponse(savedScore);
    }

    public List<GameScoreResponse> getUserGameScores(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GameScore> scores = gameScoreRepository.findByUserOrderByCreatedAtDesc(user);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<GameScoreResponse> getUserGameScoresByType(String userEmail, String gameType) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GameScore> scores = gameScoreRepository.findByUserAndGameTypeOrderByCreatedAtDesc(user, gameType);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Optional<GameScoreResponse> getUserBestScore(String userEmail, String gameType) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<GameScore> bestScore = gameScoreRepository.findBestScoreByUserAndGameType(user, gameType);
        return bestScore.map(this::convertToResponse);
    }

    public List<LeaderboardResponse> getGlobalLeaderboard(int limit) {
        List<GameScore> topScores = gameScoreRepository.findTopScores();
        return topScores.stream()
                .limit(limit)
                .map(this::convertToLeaderboardResponse)
                .collect(Collectors.toList());
    }

    public List<LeaderboardResponse> getGameTypeLeaderboard(String gameType, int limit) {
        List<GameScore> topScores = gameScoreRepository.findTopScoresByGameType(gameType);
        return topScores.stream()
                .limit(limit)
                .map(this::convertToLeaderboardResponse)
                .collect(Collectors.toList());
    }

    public Long getUserTotalPoints(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gameScoreRepository.getTotalPointsByUser(user);
    }

    public Long getUserGamesPlayed(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gameScoreRepository.countGamesPlayedByUser(user);
    }

    public Long getUserGamesPlayedByType(String userEmail, String gameType) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gameScoreRepository.countGamesPlayedByUserAndGameType(user, gameType);
    }

    public Double getUserAverageScore(String userEmail, String gameType) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Double avgScore = gameScoreRepository.getAverageScoreByUserAndGameType(user, gameType);
        return avgScore != null ? avgScore : 0.0;
    }

    public List<GameScoreResponse> getUserRecentScores(String userEmail, int days) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        List<GameScore> recentScores = gameScoreRepository.findRecentScoresByUser(user, startDate);
        
        return recentScores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private GameScoreResponse convertToResponse(GameScore gameScore) {
        GameScoreResponse response = new GameScoreResponse();
        response.setId(gameScore.getId());
        response.setGameType(gameScore.getGameType());
        response.setScore(gameScore.getScore());
        response.setMaxScore(gameScore.getMaxScore());
        response.setTimeSpent(gameScore.getTimeSpent());
        response.setMovesUsed(gameScore.getMovesUsed());
        response.setPerfectScore(gameScore.getPerfectScore());
        response.setPointsEarned(gameScore.getPointsEarned());
        response.setGameData(gameScore.getGameData());
        response.setCreatedAt(gameScore.getCreatedAt());
        return response;
    }

    private LeaderboardResponse convertToLeaderboardResponse(GameScore gameScore) {
        LeaderboardResponse response = new LeaderboardResponse();
        response.setUserId(gameScore.getUser().getId());
        response.setUsername(gameScore.getUser().getUsername());
        response.setEmail(gameScore.getUser().getEmail());
        response.setGameType(gameScore.getGameType());
        response.setScore(gameScore.getScore());
        response.setPointsEarned(gameScore.getPointsEarned());
        response.setPerfectScore(gameScore.getPerfectScore());
        response.setCreatedAt(gameScore.getCreatedAt());
        return response;
    }
}
