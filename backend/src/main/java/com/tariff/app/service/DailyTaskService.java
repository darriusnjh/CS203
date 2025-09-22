package com.tariff.app.service;

import com.tariff.app.entity.DailyTask;
import com.tariff.app.repository.DailyTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class DailyTaskService {

    @Autowired
    private DailyTaskRepository dailyTaskRepository;

    // Basic CRUD operations
    @Transactional(readOnly = true)
    public List<DailyTask> getAllTasks() {
        return dailyTaskRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<DailyTask> getTaskById(UUID id) {
        return dailyTaskRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<DailyTask> getTaskByTaskId(String taskId) {
        return dailyTaskRepository.findByTaskId(taskId);
    }

    @Transactional
    public DailyTask createTask(DailyTask task) {
        return dailyTaskRepository.save(task);
    }

    @Transactional
    public DailyTask updateTask(DailyTask task) {
        return dailyTaskRepository.save(task);
    }

    @Transactional
    public void deleteTask(UUID id) {
        dailyTaskRepository.deleteById(id);
    }

    // Task filtering methods
    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByDate(LocalDate date) {
        return dailyTaskRepository.findByTaskDateOrderByCreatedAtAsc(date);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getActiveTasksByDate(LocalDate date) {
        return dailyTaskRepository.findByTaskDateAndActiveTrueOrderByCreatedAtAsc(date);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByType(String taskType) {
        return dailyTaskRepository.findByTaskTypeOrderByCreatedAtDesc(taskType);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getActiveTasksByType(String taskType) {
        return dailyTaskRepository.findByTaskTypeAndActiveTrueOrderByCreatedAtDesc(taskType);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByCategory(String category) {
        return dailyTaskRepository.findByCategoryOrderByCreatedAtDesc(category);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getActiveTasksByCategory(String category) {
        return dailyTaskRepository.findByCategoryAndActiveTrueOrderByCreatedAtDesc(category);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByDifficulty(String difficulty) {
        return dailyTaskRepository.findByDifficultyOrderByCreatedAtDesc(difficulty);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getActiveTasksByDifficulty(String difficulty) {
        return dailyTaskRepository.findByDifficultyAndActiveTrueOrderByCreatedAtDesc(difficulty);
    }

    // Date range queries
    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByDateRange(LocalDate startDate, LocalDate endDate) {
        return dailyTaskRepository.findByTaskDateBetweenOrderByTaskDateAsc(startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getActiveTasksByDateRange(LocalDate startDate, LocalDate endDate) {
        return dailyTaskRepository.findByTaskDateBetweenAndActiveTrueOrderByTaskDateAsc(startDate, endDate);
    }

    // Paginated queries
    @Transactional(readOnly = true)
    public Page<DailyTask> getActiveTasksPaginated(Pageable pageable) {
        return dailyTaskRepository.findByActiveTrueOrderByTaskDateDesc(pageable);
    }

    @Transactional(readOnly = true)
    public Page<DailyTask> getTasksByTypePaginated(String taskType, Pageable pageable) {
        return dailyTaskRepository.findByTaskTypeOrderByCreatedAtDesc(taskType, pageable);
    }

    @Transactional(readOnly = true)
    public Page<DailyTask> getTasksByCategoryPaginated(String category, Pageable pageable) {
        return dailyTaskRepository.findByCategoryOrderByCreatedAtDesc(category, pageable);
    }

    // Statistics methods
    @Transactional(readOnly = true)
    public List<Object[]> getTaskTypeStatistics() {
        return dailyTaskRepository.getTaskTypeStatistics();
    }

    @Transactional(readOnly = true)
    public List<Object[]> getCategoryStatistics() {
        return dailyTaskRepository.getCategoryStatistics();
    }

    @Transactional(readOnly = true)
    public List<Object[]> getDifficultyStatistics() {
        return dailyTaskRepository.getDifficultyStatistics();
    }

    // Points and progress filtering
    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByPointsRange(Integer minPoints, Integer maxPoints) {
        return dailyTaskRepository.findByPointsBetweenAndActiveTrueOrderByPointsDesc(minPoints, maxPoints);
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getTasksByMaxProgressRange(Integer minProgress, Integer maxProgress) {
        return dailyTaskRepository.findByMaxProgressBetweenAndActiveTrueOrderByMaxProgressAsc(minProgress, maxProgress);
    }

    // Task lifecycle management
    @Transactional(readOnly = true)
    public List<DailyTask> getUpcomingTasks() {
        return dailyTaskRepository.findUpcomingTasks(LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getExpiredTasks() {
        return dailyTaskRepository.findExpiredTasks(LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getTasksExpiringSoon(int days) {
        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = currentDate.plusDays(days);
        return dailyTaskRepository.findTasksExpiringSoon(currentDate, futureDate);
    }

    // Count methods
    @Transactional(readOnly = true)
    public Long countActiveTasksByDate(LocalDate taskDate) {
        return dailyTaskRepository.countActiveTasksByDate(taskDate);
    }

    @Transactional(readOnly = true)
    public Long countActiveTasksByType(String taskType) {
        return dailyTaskRepository.countActiveTasksByType(taskType);
    }

    // Reward-based queries
    @Transactional(readOnly = true)
    public List<DailyTask> getTasksWithRewards() {
        return dailyTaskRepository.findByRewardIsNotNullAndActiveTrueOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<DailyTask> getTasksWithoutRewards() {
        return dailyTaskRepository.findByRewardIsNullAndActiveTrueOrderByCreatedAtDesc();
    }

    // Batch operations
    @Transactional
    public List<DailyTask> createMultipleTasks(List<DailyTask> tasks) {
        return dailyTaskRepository.saveAll(tasks);
    }

    @Transactional
    public void deactivateTasks(List<UUID> taskIds) {
        List<DailyTask> tasks = dailyTaskRepository.findAllById(taskIds);
        tasks.forEach(task -> task.setActive(false));
        dailyTaskRepository.saveAll(tasks);
    }

    @Transactional
    public void activateTasks(List<UUID> taskIds) {
        List<DailyTask> tasks = dailyTaskRepository.findAllById(taskIds);
        tasks.forEach(task -> task.setActive(true));
        dailyTaskRepository.saveAll(tasks);
    }

    // Task generation helpers
    @Transactional
    public DailyTask createDailyQuizTask(String title, String description, Integer points, String difficulty) {
        DailyTask task = new DailyTask();
        task.setTaskId("quiz_" + System.currentTimeMillis());
        task.setTitle(title);
        task.setDescription(description);
        task.setCategory("Quiz");
        task.setPoints(points);
        task.setDifficulty(difficulty);
        task.setMaxProgress(1);
        task.setTaskType("Daily Quiz");
        task.setTaskDate(LocalDate.now());
        task.setActive(true);
        return dailyTaskRepository.save(task);
    }

    @Transactional
    public DailyTask createDailyChallengeTask(String title, String description, Integer points, String difficulty, Integer maxProgress) {
        DailyTask task = new DailyTask();
        task.setTaskId("challenge_" + System.currentTimeMillis());
        task.setTitle(title);
        task.setDescription(description);
        task.setCategory("Challenge");
        task.setPoints(points);
        task.setDifficulty(difficulty);
        task.setMaxProgress(maxProgress);
        task.setTaskType("Daily Challenge");
        task.setTaskDate(LocalDate.now());
        task.setActive(true);
        return dailyTaskRepository.save(task);
    }
}
