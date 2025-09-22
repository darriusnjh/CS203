package com.tariff.app.service;

import com.tariff.app.dto.GameScoreRequest;
import com.tariff.app.dto.GameScoreResponse;
import com.tariff.app.dto.LeaderboardResponse;
import com.tariff.app.entity.GameScore;
import com.tariff.app.entity.User;
import com.tariff.app.repository.GameScoreRepository;
import com.tariff.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class GameService {

    @Autowired
    private GameScoreRepository gameScoreRepository;

    @Autowired
    private UserRepository userRepository;

    public GameScoreResponse saveGameScore(GameScoreRequest request, String username) {
        User user = userRepository.findByUsername(username)
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

    public List<GameScoreResponse> getUserGameScores(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GameScore> scores = gameScoreRepository.findByUserOrderByCreatedAtDesc(user);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<GameScoreResponse> getUserGameScoresByType(String username, String gameType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GameScore> scores = gameScoreRepository.findByUserAndGameTypeOrderByCreatedAtDesc(user, gameType);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Optional<GameScoreResponse> getUserBestScore(String username, String gameType) {
        User user = userRepository.findByUsername(username)
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

    public Long getUserTotalPoints(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gameScoreRepository.getTotalPointsByUser(user);
    }

    public Long getUserGamesPlayed(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gameScoreRepository.countGamesPlayedByUser(user);
    }

    public Long getUserGamesPlayedByType(String username, String gameType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gameScoreRepository.countGamesPlayedByUserAndGameType(user, gameType);
    }

    public Double getUserAverageScore(String username, String gameType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Double avgScore = gameScoreRepository.getAverageScoreByUserAndGameType(user, gameType);
        return avgScore != null ? avgScore : 0.0;
    }

    public List<GameScoreResponse> getUserRecentScores(String username, int days) {
        User user = userRepository.findByUsername(username)
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
        response.setEmail(gameScore.getUser().getUsername()); // Using username as email since User doesn't have email
        response.setGameType(gameScore.getGameType());
        response.setScore(gameScore.getScore());
        response.setPointsEarned(gameScore.getPointsEarned());
        response.setPerfectScore(gameScore.getPerfectScore());
        response.setCreatedAt(gameScore.getCreatedAt());
        return response;
    }

    // Advanced service methods with pagination
    @Transactional(readOnly = true)
    public Page<GameScoreResponse> getUserGameScoresPaginated(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Page<GameScore> scores = gameScoreRepository.findByUserOrderByCreatedAtDesc(user, pageable);
        return scores.map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public Page<GameScoreResponse> getUserGameScoresByTypePaginated(String username, String gameType, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Page<GameScore> scores = gameScoreRepository.findByUserAndGameTypeOrderByCreatedAtDesc(user, gameType, pageable);
        return scores.map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public Page<LeaderboardResponse> getGameTypeLeaderboardPaginated(String gameType, Pageable pageable) {
        Page<GameScore> scores = gameScoreRepository.findByGameTypeOrderByScoreDesc(gameType, pageable);
        return scores.map(this::convertToLeaderboardResponse);
    }

    // Statistics methods
    @Transactional(readOnly = true)
    public List<Object[]> getUserGameStatistics(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return gameScoreRepository.getGameStatisticsByUser(user);
    }

    @Transactional(readOnly = true)
    public List<Object[]> getGlobalGameStatistics() {
        return gameScoreRepository.getGlobalGameStatistics();
    }

    @Transactional(readOnly = true)
    public List<Object[]> getUserDailyStats(String username, int days) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        return gameScoreRepository.getDailyStatsByUser(user, startDate);
    }

    // Performance metrics
    @Transactional(readOnly = true)
    public List<GameScoreResponse> getUserFastestGames(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<GameScore> scores = gameScoreRepository.findFastestGamesByUser(user);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GameScoreResponse> getUserMostEfficientGames(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<GameScore> scores = gameScoreRepository.findMostEfficientGamesByUser(user);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Streak calculations
    @Transactional(readOnly = true)
    public Long getUserPlayStreak(String username, int days) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        LocalDateTime endDate = LocalDateTime.now();
        
        return gameScoreRepository.countDistinctPlayDays(user, startDate, endDate);
    }

    // Perfect scores
    @Transactional(readOnly = true)
    public List<GameScoreResponse> getUserPerfectScores(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<GameScore> scores = gameScoreRepository.findPerfectScoresByUser(user);
        return scores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Batch operations
    @Transactional
    public List<GameScoreResponse> saveMultipleGameScores(List<GameScoreRequest> requests, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<GameScore> gameScores = requests.stream()
                .map(request -> {
                    GameScore gameScore = new GameScore();
                    gameScore.setUser(user);
                    gameScore.setGameType(request.getGameType());
                    gameScore.setScore(request.getScore());
                    gameScore.setPointsEarned(request.getScore() * 10); // Simple points calculation
                    gameScore.setPerfectScore(request.getScore() >= 100);
                    return gameScore;
                })
                .collect(Collectors.toList());
        
        List<GameScore> savedScores = gameScoreRepository.saveAll(gameScores);
        return savedScores.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Delete operations
    @Transactional
    public void deleteGameScore(UUID scoreId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        GameScore gameScore = gameScoreRepository.findById(scoreId)
                .orElseThrow(() -> new RuntimeException("Game score not found"));
        
        if (!gameScore.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized to delete this score");
        }
        
        gameScoreRepository.delete(gameScore);
    }

    @Transactional
    public void deleteAllUserGameScores(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<GameScore> userScores = gameScoreRepository.findByUserOrderByCreatedAtDesc(user);
        gameScoreRepository.deleteAll(userScores);
    }
}
