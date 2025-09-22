package com.tariff.app.service;

import com.tariff.app.entity.DailyTask;
import com.tariff.app.entity.User;
import com.tariff.app.entity.UserTaskProgress;
import com.tariff.app.repository.UserRepository;
import com.tariff.app.repository.UserTaskProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserTaskProgressService {

    @Autowired
    private UserTaskProgressRepository userTaskProgressRepository;

    @Autowired
    private UserRepository userRepository;

    // Basic CRUD operations
    @Transactional(readOnly = true)
    public List<UserTaskProgress> getAllProgress() {
        return userTaskProgressRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<UserTaskProgress> getProgressById(UUID id) {
        return userTaskProgressRepository.findById(id);
    }

    @Transactional
    public UserTaskProgress createProgress(UserTaskProgress progress) {
        return userTaskProgressRepository.save(progress);
    }

    @Transactional
    public UserTaskProgress updateProgress(UserTaskProgress progress) {
        return userTaskProgressRepository.save(progress);
    }

    @Transactional
    public void deleteProgress(UUID id) {
        userTaskProgressRepository.deleteById(id);
    }

    // User-specific queries
    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserProgress(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserProgressByDate(String username, LocalDate taskDate) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserAndTaskDateOrderByCreatedAtDesc(user, taskDate);
    }

    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserCompletedTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserAndCompletedTrueOrderByCompletedAtDesc(user);
    }

    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserIncompleteTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserAndCompletedFalseOrderByCreatedAtDesc(user);
    }

    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserInProgressTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findInProgressTasksByUser(user);
    }

    // Paginated queries
    @Transactional(readOnly = true)
    public Page<UserTaskProgress> getUserProgressPaginated(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserOrderByCreatedAtDesc(user, pageable);
    }

    @Transactional(readOnly = true)
    public Page<UserTaskProgress> getUserCompletedTasksPaginated(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserAndCompletedTrueOrderByCompletedAtDesc(user, pageable);
    }

    @Transactional(readOnly = true)
    public Page<UserTaskProgress> getUserIncompleteTasksPaginated(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserAndCompletedFalseOrderByCreatedAtDesc(user, pageable);
    }

    // Statistics methods
    @Transactional(readOnly = true)
    public Long getUserTotalTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.countTotalTasksByUser(user);
    }

    @Transactional(readOnly = true)
    public Long getUserCompletedTasksCount(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.countCompletedTasksByUser(user);
    }

    @Transactional(readOnly = true)
    public Long getUserIncompleteTasksCount(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.countIncompleteTasksByUser(user);
    }

    @Transactional(readOnly = true)
    public Long getUserTotalPointsEarned(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.getTotalPointsEarnedByUser(user);
    }

    @Transactional(readOnly = true)
    public Long getUserPointsEarnedOnDate(String username, LocalDate taskDate) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.getPointsEarnedByUserOnDate(user, taskDate);
    }

    // Daily statistics
    @Transactional(readOnly = true)
    public List<Object[]> getUserDailyStats(String username, int days) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDate startDate = LocalDate.now().minusDays(days);
        return userTaskProgressRepository.getDailyStatsByUser(user, startDate);
    }

    @Transactional(readOnly = true)
    public List<Object[]> getUserTaskCategoryStats(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.getTaskCategoryStatsByUser(user);
    }

    // Streak calculations
    @Transactional(readOnly = true)
    public Long getUserTaskCompletionStreak(String username, int days) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDate startDate = LocalDate.now().minusDays(days);
        LocalDate endDate = LocalDate.now();
        return userTaskProgressRepository.countCompletedTaskDays(user, startDate, endDate);
    }

    // Recent activity
    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserRecentActivity(String username, int hours) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return userTaskProgressRepository.findRecentActivityByUser(user, since);
    }

    // Progress management
    @Transactional
    public UserTaskProgress updateTaskProgress(String username, UUID taskId, Integer progress) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Optional<UserTaskProgress> existingProgress = userTaskProgressRepository.findById(taskId);
        if (existingProgress.isEmpty()) {
            throw new RuntimeException("Task progress not found");
        }
        
        UserTaskProgress taskProgress = existingProgress.get();
        if (!taskProgress.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized to update this task progress");
        }
        
        taskProgress.setProgress(progress);
        
        // Check if task is completed
        if (progress >= taskProgress.getTask().getMaxProgress() && !taskProgress.getCompleted()) {
            taskProgress.setCompleted(true);
            taskProgress.setCompletedAt(LocalDateTime.now());
            taskProgress.setPointsEarned(taskProgress.getTask().getPoints());
        }
        
        return userTaskProgressRepository.save(taskProgress);
    }

    @Transactional
    public UserTaskProgress completeTask(String username, UUID taskId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Optional<UserTaskProgress> existingProgress = userTaskProgressRepository.findById(taskId);
        if (existingProgress.isEmpty()) {
            throw new RuntimeException("Task progress not found");
        }
        
        UserTaskProgress taskProgress = existingProgress.get();
        if (!taskProgress.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized to complete this task");
        }
        
        taskProgress.setCompleted(true);
        taskProgress.setCompletedAt(LocalDateTime.now());
        taskProgress.setProgress(taskProgress.getTask().getMaxProgress());
        taskProgress.setPointsEarned(taskProgress.getTask().getPoints());
        
        return userTaskProgressRepository.save(taskProgress);
    }

    // Task assignment
    @Transactional
    public UserTaskProgress assignTaskToUser(String username, DailyTask task) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if user already has this task for today
        Optional<UserTaskProgress> existingProgress = userTaskProgressRepository
                .findByUserAndTaskAndTaskDate(user, task, LocalDate.now());
        
        if (existingProgress.isPresent()) {
            return existingProgress.get();
        }
        
        UserTaskProgress progress = new UserTaskProgress();
        progress.setUser(user);
        progress.setTask(task);
        progress.setTaskDate(LocalDate.now());
        progress.setProgress(0);
        progress.setCompleted(false);
        progress.setPointsEarned(0);
        
        return userTaskProgressRepository.save(progress);
    }

    // Batch operations
    @Transactional
    public List<UserTaskProgress> assignMultipleTasksToUser(String username, List<DailyTask> tasks) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<UserTaskProgress> progressList = tasks.stream()
                .map(task -> {
                    Optional<UserTaskProgress> existing = userTaskProgressRepository
                            .findByUserAndTaskAndTaskDate(user, task, LocalDate.now());
                    
                    if (existing.isPresent()) {
                        return existing.get();
                    }
                    
                    UserTaskProgress progress = new UserTaskProgress();
                    progress.setUser(user);
                    progress.setTask(task);
                    progress.setTaskDate(LocalDate.now());
                    progress.setProgress(0);
                    progress.setCompleted(false);
                    progress.setPointsEarned(0);
                    return progress;
                })
                .toList();
        
        return userTaskProgressRepository.saveAll(progressList);
    }

    // Date range queries
    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserProgressByDateRange(String username, LocalDate startDate, LocalDate endDate) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findByUserAndTaskDateBetweenOrderByTaskDateDesc(user, startDate, endDate);
    }

    // High progress tasks
    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserHighProgressTasks(String username, Integer minProgress) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findHighProgressTasksByUser(user, minProgress);
    }

    // Tasks completed today
    @Transactional(readOnly = true)
    public List<UserTaskProgress> getUserTasksCompletedToday(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userTaskProgressRepository.findTasksCompletedToday(user, LocalDate.now());
    }
}
