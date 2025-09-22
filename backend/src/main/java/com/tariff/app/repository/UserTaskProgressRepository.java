package com.tariff.app.repository;

import com.tariff.app.entity.DailyTask;
import com.tariff.app.entity.User;
import com.tariff.app.entity.UserTaskProgress;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserTaskProgressRepository extends JpaRepository<UserTaskProgress, UUID> {
    
    // Find progress by user and task
    List<UserTaskProgress> findByUserOrderByCreatedAtDesc(User user);
    List<UserTaskProgress> findByUserAndTaskOrderByCreatedAtDesc(User user, DailyTask task);
    
    // Find progress by user and date
    List<UserTaskProgress> findByUserAndTaskDateOrderByCreatedAtDesc(User user, LocalDate taskDate);
    
    // Find progress by task and date
    List<UserTaskProgress> findByTaskAndTaskDateOrderByCreatedAtDesc(DailyTask task, LocalDate taskDate);
    
    // Find completed progress
    List<UserTaskProgress> findByUserAndCompletedTrueOrderByCompletedAtDesc(User user);
    List<UserTaskProgress> findByUserAndCompletedTrueAndTaskDateOrderByCompletedAtDesc(User user, LocalDate taskDate);
    
    // Find incomplete progress
    List<UserTaskProgress> findByUserAndCompletedFalseOrderByCreatedAtDesc(User user);
    List<UserTaskProgress> findByUserAndCompletedFalseAndTaskDateOrderByCreatedAtDesc(User user, LocalDate taskDate);
    
    // Find specific progress record
    Optional<UserTaskProgress> findByUserAndTaskAndTaskDate(User user, DailyTask task, LocalDate taskDate);
    
    // Paginated queries
    Page<UserTaskProgress> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    Page<UserTaskProgress> findByUserAndCompletedTrueOrderByCompletedAtDesc(User user, Pageable pageable);
    Page<UserTaskProgress> findByUserAndCompletedFalseOrderByCreatedAtDesc(User user, Pageable pageable);
    
    // Statistics queries
    @Query("SELECT COUNT(utp) FROM UserTaskProgress utp WHERE utp.user = :user")
    Long countTotalTasksByUser(@Param("user") User user);
    
    @Query("SELECT COUNT(utp) FROM UserTaskProgress utp WHERE utp.user = :user AND utp.completed = true")
    Long countCompletedTasksByUser(@Param("user") User user);
    
    @Query("SELECT COUNT(utp) FROM UserTaskProgress utp WHERE utp.user = :user AND utp.completed = false")
    Long countIncompleteTasksByUser(@Param("user") User user);
    
    @Query("SELECT COALESCE(SUM(utp.pointsEarned), 0) FROM UserTaskProgress utp WHERE utp.user = :user")
    Long getTotalPointsEarnedByUser(@Param("user") User user);
    
    @Query("SELECT COALESCE(SUM(utp.pointsEarned), 0) FROM UserTaskProgress utp WHERE utp.user = :user AND utp.taskDate = :taskDate")
    Long getPointsEarnedByUserOnDate(@Param("user") User user, @Param("taskDate") LocalDate taskDate);
    
    // Daily statistics
    @Query("SELECT utp.taskDate, COUNT(utp), COUNT(CASE WHEN utp.completed = true THEN 1 END), SUM(utp.pointsEarned) " +
           "FROM UserTaskProgress utp WHERE utp.user = :user AND utp.taskDate >= :startDate " +
           "GROUP BY utp.taskDate ORDER BY utp.taskDate")
    List<Object[]> getDailyStatsByUser(@Param("user") User user, @Param("startDate") LocalDate startDate);
    
    // Task type statistics
    @Query("SELECT utp.task.category, COUNT(utp), COUNT(CASE WHEN utp.completed = true THEN 1 END), SUM(utp.pointsEarned) " +
           "FROM UserTaskProgress utp WHERE utp.user = :user GROUP BY utp.task.category")
    List<Object[]> getTaskCategoryStatsByUser(@Param("user") User user);
    
    // Streak calculations
    @Query("SELECT COUNT(DISTINCT utp.taskDate) FROM UserTaskProgress utp WHERE utp.user = :user " +
           "AND utp.completed = true AND utp.taskDate >= :startDate AND utp.taskDate <= :endDate")
    Long countCompletedTaskDays(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // Recent activity
    @Query("SELECT utp FROM UserTaskProgress utp WHERE utp.user = :user AND utp.createdAt >= :since ORDER BY utp.createdAt DESC")
    List<UserTaskProgress> findRecentActivityByUser(@Param("user") User user, @Param("since") LocalDateTime since);
    
    // Find progress by date range
    List<UserTaskProgress> findByUserAndTaskDateBetweenOrderByTaskDateDesc(User user, LocalDate startDate, LocalDate endDate);
    
    // Find progress by completion status and date range
    List<UserTaskProgress> findByUserAndCompletedAndTaskDateBetweenOrderByTaskDateDesc(
            User user, Boolean completed, LocalDate startDate, LocalDate endDate);
    
    // Find users who completed specific task
    @Query("SELECT utp.user FROM UserTaskProgress utp WHERE utp.task = :task AND utp.completed = true")
    List<User> findUsersWhoCompletedTask(@Param("task") DailyTask task);
    
    // Find users who completed task on specific date
    @Query("SELECT utp.user FROM UserTaskProgress utp WHERE utp.task = :task AND utp.taskDate = :taskDate AND utp.completed = true")
    List<User> findUsersWhoCompletedTaskOnDate(@Param("task") DailyTask task, @Param("taskDate") LocalDate taskDate);
    
    // Completion rate by task
    @Query("SELECT utp.task, COUNT(utp), COUNT(CASE WHEN utp.completed = true THEN 1 END) " +
           "FROM UserTaskProgress utp WHERE utp.taskDate = :taskDate GROUP BY utp.task")
    List<Object[]> getTaskCompletionRatesByDate(@Param("taskDate") LocalDate taskDate);
    
    // Find progress with high completion rate
    @Query("SELECT utp FROM UserTaskProgress utp WHERE utp.user = :user AND utp.progress >= :minProgress ORDER BY utp.progress DESC")
    List<UserTaskProgress> findHighProgressTasksByUser(@Param("user") User user, @Param("minProgress") Integer minProgress);
    
    // Find tasks completed today
    @Query("SELECT utp FROM UserTaskProgress utp WHERE utp.user = :user AND utp.completed = true AND DATE(utp.completedAt) = :today")
    List<UserTaskProgress> findTasksCompletedToday(@Param("user") User user, @Param("today") LocalDate today);
    
    // Find tasks started but not completed
    @Query("SELECT utp FROM UserTaskProgress utp WHERE utp.user = :user AND utp.completed = false AND utp.progress > 0 ORDER BY utp.createdAt DESC")
    List<UserTaskProgress> findInProgressTasksByUser(@Param("user") User user);
}
