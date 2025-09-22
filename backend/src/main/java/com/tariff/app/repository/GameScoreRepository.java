package com.tariff.app.repository;

import com.tariff.app.entity.GameScore;
import com.tariff.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface GameScoreRepository extends JpaRepository<GameScore, UUID> {
    
    // Find all scores for a specific user
    List<GameScore> findByUserOrderByCreatedAtDesc(User user);
    
    // Find scores by game type for a specific user
    List<GameScore> findByUserAndGameTypeOrderByCreatedAtDesc(User user, String gameType);
    
    // Find best score for a specific user and game type
    @Query("SELECT gs FROM GameScore gs WHERE gs.user = :user AND gs.gameType = :gameType ORDER BY gs.score DESC")
    Optional<GameScore> findBestScoreByUserAndGameType(@Param("user") User user, @Param("gameType") String gameType);
    
    // Find top scores globally
    @Query("SELECT gs FROM GameScore gs ORDER BY gs.score DESC")
    List<GameScore> findTopScores();
    
    // Find top scores by game type
    @Query("SELECT gs FROM GameScore gs WHERE gs.gameType = :gameType ORDER BY gs.score DESC")
    List<GameScore> findTopScoresByGameType(@Param("gameType") String gameType);
    
    // Find scores within a date range
    List<GameScore> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find scores for a specific user within a date range
    List<GameScore> findByUserAndCreatedAtBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    // Count total games played by a user
    @Query("SELECT COUNT(gs) FROM GameScore gs WHERE gs.user = :user")
    Long countGamesPlayedByUser(@Param("user") User user);
    
    // Count games played by game type for a user
    @Query("SELECT COUNT(gs) FROM GameScore gs WHERE gs.user = :user AND gs.gameType = :gameType")
    Long countGamesPlayedByUserAndGameType(@Param("user") User user, @Param("gameType") String gameType);
    
    // Calculate total points earned by a user
    @Query("SELECT COALESCE(SUM(gs.pointsEarned), 0) FROM GameScore gs WHERE gs.user = :user")
    Long getTotalPointsByUser(@Param("user") User user);
    
    // Calculate average score by game type for a user
    @Query("SELECT AVG(gs.score) FROM GameScore gs WHERE gs.user = :user AND gs.gameType = :gameType")
    Double getAverageScoreByUserAndGameType(@Param("user") User user, @Param("gameType") String gameType);
    
    // Find perfect scores by user
    @Query("SELECT gs FROM GameScore gs WHERE gs.user = :user AND gs.perfectScore = true ORDER BY gs.createdAt DESC")
    List<GameScore> findPerfectScoresByUser(@Param("user") User user);
    
    // Find recent scores (last 7 days)
    @Query("SELECT gs FROM GameScore gs WHERE gs.createdAt >= :sevenDaysAgo ORDER BY gs.createdAt DESC")
    List<GameScore> findRecentScores(@Param("sevenDaysAgo") LocalDateTime sevenDaysAgo);
    
    // Find recent scores for a specific user
    @Query("SELECT gs FROM GameScore gs WHERE gs.user = :user AND gs.createdAt >= :sevenDaysAgo ORDER BY gs.createdAt DESC")
    List<GameScore> findRecentScoresByUser(@Param("user") User user, @Param("sevenDaysAgo") LocalDateTime sevenDaysAgo);
    
    // Paginated queries for better performance
    Page<GameScore> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    Page<GameScore> findByUserAndGameTypeOrderByCreatedAtDesc(User user, String gameType, Pageable pageable);
    Page<GameScore> findByGameTypeOrderByScoreDesc(String gameType, Pageable pageable);
    
    // Statistics queries
    @Query("SELECT gs.gameType, COUNT(gs), AVG(gs.score), MAX(gs.score), MIN(gs.score) " +
           "FROM GameScore gs WHERE gs.user = :user GROUP BY gs.gameType")
    List<Object[]> getGameStatisticsByUser(@Param("user") User user);
    
    @Query("SELECT gs.gameType, COUNT(gs), AVG(gs.score), MAX(gs.score), MIN(gs.score) " +
           "FROM GameScore gs GROUP BY gs.gameType")
    List<Object[]> getGlobalGameStatistics();
    
    // Leaderboard queries with user information
    @Query("SELECT gs FROM GameScore gs JOIN FETCH gs.user ORDER BY gs.score DESC")
    List<GameScore> findTopScoresWithUser();
    
    @Query("SELECT gs FROM GameScore gs JOIN FETCH gs.user WHERE gs.gameType = :gameType ORDER BY gs.score DESC")
    List<GameScore> findTopScoresByGameTypeWithUser(@Param("gameType") String gameType);
    
    // Streak calculations
    @Query("SELECT COUNT(DISTINCT DATE(gs.createdAt)) FROM GameScore gs WHERE gs.user = :user " +
           "AND gs.createdAt >= :startDate AND gs.createdAt <= :endDate")
    Long countDistinctPlayDays(@Param("user") User user, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Performance metrics
    @Query("SELECT gs FROM GameScore gs WHERE gs.user = :user AND gs.timeSpent IS NOT NULL " +
           "ORDER BY gs.timeSpent ASC")
    List<GameScore> findFastestGamesByUser(@Param("user") User user);
    
    @Query("SELECT gs FROM GameScore gs WHERE gs.user = :user AND gs.movesUsed IS NOT NULL " +
           "ORDER BY gs.movesUsed ASC")
    List<GameScore> findMostEfficientGamesByUser(@Param("user") User user);
    
    // Daily/weekly/monthly aggregations
    @Query("SELECT DATE(gs.createdAt), COUNT(gs), SUM(gs.pointsEarned) " +
           "FROM GameScore gs WHERE gs.user = :user AND gs.createdAt >= :startDate " +
           "GROUP BY DATE(gs.createdAt) ORDER BY DATE(gs.createdAt)")
    List<Object[]> getDailyStatsByUser(@Param("user") User user, @Param("startDate") LocalDateTime startDate);
}
