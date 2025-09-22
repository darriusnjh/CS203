package com.tariff.app.repository;

import com.tariff.app.entity.DailyTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DailyTaskRepository extends JpaRepository<DailyTask, UUID> {
    
    // Find tasks by date
    List<DailyTask> findByTaskDateOrderByCreatedAtAsc(LocalDate taskDate);
    
    // Find active tasks by date
    List<DailyTask> findByTaskDateAndActiveTrueOrderByCreatedAtAsc(LocalDate taskDate);
    
    // Find tasks by type
    List<DailyTask> findByTaskTypeOrderByCreatedAtDesc(String taskType);
    
    // Find active tasks by type
    List<DailyTask> findByTaskTypeAndActiveTrueOrderByCreatedAtDesc(String taskType);
    
    // Find tasks by category
    List<DailyTask> findByCategoryOrderByCreatedAtDesc(String category);
    
    // Find active tasks by category
    List<DailyTask> findByCategoryAndActiveTrueOrderByCreatedAtDesc(String category);
    
    // Find tasks by difficulty
    List<DailyTask> findByDifficultyOrderByCreatedAtDesc(String difficulty);
    
    // Find active tasks by difficulty
    List<DailyTask> findByDifficultyAndActiveTrueOrderByCreatedAtDesc(String difficulty);
    
    // Find tasks within date range
    List<DailyTask> findByTaskDateBetweenOrderByTaskDateAsc(LocalDate startDate, LocalDate endDate);
    
    // Find active tasks within date range
    List<DailyTask> findByTaskDateBetweenAndActiveTrueOrderByTaskDateAsc(LocalDate startDate, LocalDate endDate);
    
    // Find task by task_id
    Optional<DailyTask> findByTaskId(String taskId);
    
    // Find active task by task_id
    Optional<DailyTask> findByTaskIdAndActiveTrue(String taskId);
    
    // Paginated queries
    Page<DailyTask> findByActiveTrueOrderByTaskDateDesc(Pageable pageable);
    Page<DailyTask> findByTaskTypeOrderByCreatedAtDesc(String taskType, Pageable pageable);
    Page<DailyTask> findByCategoryOrderByCreatedAtDesc(String category, Pageable pageable);
    
    // Statistics queries
    @Query("SELECT dt.taskType, COUNT(dt), AVG(dt.points), SUM(dt.points) " +
           "FROM DailyTask dt WHERE dt.active = true GROUP BY dt.taskType")
    List<Object[]> getTaskTypeStatistics();
    
    @Query("SELECT dt.category, COUNT(dt), AVG(dt.points), SUM(dt.points) " +
           "FROM DailyTask dt WHERE dt.active = true GROUP BY dt.category")
    List<Object[]> getCategoryStatistics();
    
    @Query("SELECT dt.difficulty, COUNT(dt), AVG(dt.points), SUM(dt.points) " +
           "FROM DailyTask dt WHERE dt.active = true GROUP BY dt.difficulty")
    List<Object[]> getDifficultyStatistics();
    
    // Find tasks by points range
    List<DailyTask> findByPointsBetweenAndActiveTrueOrderByPointsDesc(Integer minPoints, Integer maxPoints);
    
    // Find tasks by max progress range
    List<DailyTask> findByMaxProgressBetweenAndActiveTrueOrderByMaxProgressAsc(Integer minProgress, Integer maxProgress);
    
    // Find upcoming tasks
    @Query("SELECT dt FROM DailyTask dt WHERE dt.taskDate > :currentDate AND dt.active = true ORDER BY dt.taskDate ASC")
    List<DailyTask> findUpcomingTasks(@Param("currentDate") LocalDate currentDate);
    
    // Find expired tasks
    @Query("SELECT dt FROM DailyTask dt WHERE dt.expiryDate < :currentDate AND dt.active = true ORDER BY dt.expiryDate DESC")
    List<DailyTask> findExpiredTasks(@Param("currentDate") LocalDate currentDate);
    
    // Find tasks expiring soon
    @Query("SELECT dt FROM DailyTask dt WHERE dt.expiryDate BETWEEN :currentDate AND :futureDate AND dt.active = true ORDER BY dt.expiryDate ASC")
    List<DailyTask> findTasksExpiringSoon(@Param("currentDate") LocalDate currentDate, @Param("futureDate") LocalDate futureDate);
    
    // Count active tasks by date
    @Query("SELECT COUNT(dt) FROM DailyTask dt WHERE dt.taskDate = :taskDate AND dt.active = true")
    Long countActiveTasksByDate(@Param("taskDate") LocalDate taskDate);
    
    // Count tasks by type
    @Query("SELECT COUNT(dt) FROM DailyTask dt WHERE dt.taskType = :taskType AND dt.active = true")
    Long countActiveTasksByType(@Param("taskType") String taskType);
    
    // Find tasks with rewards
    List<DailyTask> findByRewardIsNotNullAndActiveTrueOrderByCreatedAtDesc();
    
    // Find tasks without rewards
    List<DailyTask> findByRewardIsNullAndActiveTrueOrderByCreatedAtDesc();
}
