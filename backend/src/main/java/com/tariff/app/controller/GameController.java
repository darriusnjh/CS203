package com.tariff.app.controller;

import com.tariff.app.dto.GameScoreRequest;
import com.tariff.app.dto.GameScoreResponse;
import com.tariff.app.dto.LeaderboardResponse;
import com.tariff.app.service.GameService;
import com.tariff.app.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/score")
    public ResponseEntity<GameScoreResponse> saveGameScore(
            @Valid @RequestBody GameScoreRequest request,
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        GameScoreResponse response = gameService.saveGameScore(request, userEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/scores")
    public ResponseEntity<List<GameScoreResponse>> getUserGameScores(
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        List<GameScoreResponse> scores = gameService.getUserGameScores(userEmail);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/scores/{gameType}")
    public ResponseEntity<List<GameScoreResponse>> getUserGameScoresByType(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        List<GameScoreResponse> scores = gameService.getUserGameScoresByType(userEmail, gameType);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/best-score/{gameType}")
    public ResponseEntity<GameScoreResponse> getUserBestScore(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        return gameService.getUserBestScore(userEmail, gameType)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardResponse>> getGlobalLeaderboard(
            @RequestParam(defaultValue = "10") int limit) {
        
        List<LeaderboardResponse> leaderboard = gameService.getGlobalLeaderboard(limit);
        return ResponseEntity.ok(leaderboard);
    }

    @GetMapping("/leaderboard/{gameType}")
    public ResponseEntity<List<LeaderboardResponse>> getGameTypeLeaderboard(
            @PathVariable String gameType,
            @RequestParam(defaultValue = "10") int limit) {
        
        List<LeaderboardResponse> leaderboard = gameService.getGameTypeLeaderboard(gameType, limit);
        return ResponseEntity.ok(leaderboard);
    }

    @GetMapping("/stats/total-points")
    public ResponseEntity<Long> getUserTotalPoints(
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        Long totalPoints = gameService.getUserTotalPoints(userEmail);
        return ResponseEntity.ok(totalPoints);
    }

    @GetMapping("/stats/games-played")
    public ResponseEntity<Long> getUserGamesPlayed(
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        Long gamesPlayed = gameService.getUserGamesPlayed(userEmail);
        return ResponseEntity.ok(gamesPlayed);
    }

    @GetMapping("/stats/games-played/{gameType}")
    public ResponseEntity<Long> getUserGamesPlayedByType(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        Long gamesPlayed = gameService.getUserGamesPlayedByType(userEmail, gameType);
        return ResponseEntity.ok(gamesPlayed);
    }

    @GetMapping("/stats/average-score/{gameType}")
    public ResponseEntity<Double> getUserAverageScore(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        Double averageScore = gameService.getUserAverageScore(userEmail, gameType);
        return ResponseEntity.ok(averageScore);
    }

    @GetMapping("/recent-scores")
    public ResponseEntity<List<GameScoreResponse>> getUserRecentScores(
            @RequestParam(defaultValue = "7") int days,
            @RequestHeader("Authorization") String token) {
        
        String userEmail = jwtService.extractUsername(token.substring(7));
        List<GameScoreResponse> recentScores = gameService.getUserRecentScores(userEmail, days);
        return ResponseEntity.ok(recentScores);
    }
}
