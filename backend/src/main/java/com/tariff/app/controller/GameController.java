package com.tariff.app.controller;

import com.tariff.app.dto.GameScoreRequest;
import com.tariff.app.dto.GameScoreResponse;
import com.tariff.app.dto.LeaderboardResponse;
import com.tariff.app.service.GameService;
import com.tariff.app.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "https://localhost:3000", allowCredentials = "true")
@Tag(name = "Gaming System", description = "APIs for game scoring, leaderboards, and user statistics")
@SecurityRequirement(name = "bearerAuth")
public class GameController {

    @Autowired
    private GameService gameService;

    @Operation(summary = "Save Game Score", description = "Save a game score for the authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Score saved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = GameScoreResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @PostMapping("/score")
    public ResponseEntity<GameScoreResponse> saveGameScore(
            @Parameter(description = "Game score data")
            @Valid @RequestBody GameScoreRequest request,
            @Parameter(description = "Bearer token for authentication")
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        GameScoreResponse response = gameService.saveGameScore(request, username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/scores")
    public ResponseEntity<List<GameScoreResponse>> getUserGameScores(
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        List<GameScoreResponse> scores = gameService.getUserGameScores(username);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/scores/{gameType}")
    public ResponseEntity<List<GameScoreResponse>> getUserGameScoresByType(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        List<GameScoreResponse> scores = gameService.getUserGameScoresByType(username, gameType);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/best-score/{gameType}")
    public ResponseEntity<GameScoreResponse> getUserBestScore(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        return gameService.getUserBestScore(username, gameType)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Get Global Leaderboard", description = "Get the global leaderboard with top players across all games")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Leaderboard retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LeaderboardResponse.class)))
    })
    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardResponse>> getGlobalLeaderboard(
            @Parameter(description = "Number of top players to return", example = "10")
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
        
        String username = JwtService.extractUsername(token.substring(7));
        Long totalPoints = gameService.getUserTotalPoints(username);
        return ResponseEntity.ok(totalPoints);
    }

    @GetMapping("/stats/games-played")
    public ResponseEntity<Long> getUserGamesPlayed(
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        Long gamesPlayed = gameService.getUserGamesPlayed(username);
        return ResponseEntity.ok(gamesPlayed);
    }

    @GetMapping("/stats/games-played/{gameType}")
    public ResponseEntity<Long> getUserGamesPlayedByType(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        Long gamesPlayed = gameService.getUserGamesPlayedByType(username, gameType);
        return ResponseEntity.ok(gamesPlayed);
    }

    @GetMapping("/stats/average-score/{gameType}")
    public ResponseEntity<Double> getUserAverageScore(
            @PathVariable String gameType,
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        Double averageScore = gameService.getUserAverageScore(username, gameType);
        return ResponseEntity.ok(averageScore);
    }

    @GetMapping("/recent-scores")
    public ResponseEntity<List<GameScoreResponse>> getUserRecentScores(
            @RequestParam(defaultValue = "7") int days,
            @RequestHeader("Authorization") String token) {
        
        String username = JwtService.extractUsername(token.substring(7));
        List<GameScoreResponse> recentScores = gameService.getUserRecentScores(username, days);
        return ResponseEntity.ok(recentScores);
    }
}
