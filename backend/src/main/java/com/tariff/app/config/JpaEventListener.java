package com.tariff.app.config;

import com.tariff.app.entity.GameScore;
import com.tariff.app.entity.DailyTask;
import com.tariff.app.entity.UserTaskProgress;
import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class JpaEventListener {

    private static final Logger logger = LoggerFactory.getLogger(JpaEventListener.class);

    @PostPersist
    public void onGameScorePersist(GameScore gameScore) {
        logger.info("GameScore persisted: ID={}, User={}, GameType={}, Score={}", 
                   gameScore.getId(), 
                   gameScore.getUser() != null ? gameScore.getUser().getUsername() : "unknown",
                   gameScore.getGameType(), 
                   gameScore.getScore());
    }

    @PostUpdate
    public void onGameScoreUpdate(GameScore gameScore) {
        logger.info("GameScore updated: ID={}, Score={}", gameScore.getId(), gameScore.getScore());
    }

    @PostRemove
    public void onGameScoreRemove(GameScore gameScore) {
        logger.info("GameScore removed: ID={}", gameScore.getId());
    }

    @PostLoad
    public void onGameScoreLoad(GameScore gameScore) {
        logger.debug("GameScore loaded: ID={}, User={}", 
                    gameScore.getId(), 
                    gameScore.getUser() != null ? gameScore.getUser().getUsername() : "unknown");
    }

    @PostPersist
    public void onDailyTaskPersist(DailyTask dailyTask) {
        logger.info("DailyTask persisted: ID={}, TaskId={}, Title={}", 
                   dailyTask.getId(), dailyTask.getTaskId(), dailyTask.getTitle());
    }

    @PostUpdate
    public void onDailyTaskUpdate(DailyTask dailyTask) {
        logger.info("DailyTask updated: ID={}, Active={}", dailyTask.getId(), dailyTask.getActive());
    }

    @PostRemove
    public void onDailyTaskRemove(DailyTask dailyTask) {
        logger.info("DailyTask removed: ID={}", dailyTask.getId());
    }

    @PostLoad
    public void onDailyTaskLoad(DailyTask dailyTask) {
        logger.debug("DailyTask loaded: ID={}, TaskId={}", dailyTask.getId(), dailyTask.getTaskId());
    }

    @PostPersist
    public void onUserTaskProgressPersist(UserTaskProgress progress) {
        logger.info("UserTaskProgress persisted: ID={}, User={}, Task={}, Progress={}", 
                   progress.getId(),
                   progress.getUser() != null ? progress.getUser().getUsername() : "unknown",
                   progress.getTask() != null ? progress.getTask().getTaskId() : "unknown",
                   progress.getProgress());
    }

    @PostUpdate
    public void onUserTaskProgressUpdate(UserTaskProgress progress) {
        logger.info("UserTaskProgress updated: ID={}, Progress={}, Completed={}", 
                   progress.getId(), progress.getProgress(), progress.getCompleted());
    }

    @PostRemove
    public void onUserTaskProgressRemove(UserTaskProgress progress) {
        logger.info("UserTaskProgress removed: ID={}", progress.getId());
    }

    @PostLoad
    public void onUserTaskProgressLoad(UserTaskProgress progress) {
        logger.debug("UserTaskProgress loaded: ID={}, User={}, Completed={}", 
                    progress.getId(),
                    progress.getUser() != null ? progress.getUser().getUsername() : "unknown",
                    progress.getCompleted());
    }

    // Entity validation callbacks
    @PrePersist
    public void validateGameScoreBeforePersist(GameScore gameScore) {
        if (gameScore.getScore() < 0) {
            throw new IllegalArgumentException("Game score cannot be negative");
        }
        if (gameScore.getUser() == null) {
            throw new IllegalArgumentException("Game score must have a user");
        }
        logger.debug("GameScore validation passed for user: {}", 
                   gameScore.getUser().getUsername());
    }

    @PrePersist
    public void validateDailyTaskBeforePersist(DailyTask dailyTask) {
        if (dailyTask.getPoints() < 0) {
            throw new IllegalArgumentException("Daily task points cannot be negative");
        }
        if (dailyTask.getMaxProgress() <= 0) {
            throw new IllegalArgumentException("Daily task max progress must be positive");
        }
        logger.debug("DailyTask validation passed for task: {}", dailyTask.getTaskId());
    }

    @PrePersist
    public void validateUserTaskProgressBeforePersist(UserTaskProgress progress) {
        if (progress.getProgress() < 0) {
            throw new IllegalArgumentException("User task progress cannot be negative");
        }
        if (progress.getUser() == null) {
            throw new IllegalArgumentException("User task progress must have a user");
        }
        if (progress.getTask() == null) {
            throw new IllegalArgumentException("User task progress must have a task");
        }
        logger.debug("UserTaskProgress validation passed for user: {}", 
                   progress.getUser().getUsername());
    }

    // Business logic callbacks
    @PreUpdate
    public void onUserTaskProgressPreUpdate(UserTaskProgress progress) {
        // Auto-complete task if progress reaches max
        if (!progress.getCompleted() && 
            progress.getTask() != null && 
            progress.getProgress() >= progress.getTask().getMaxProgress()) {
            
            progress.setCompleted(true);
            progress.setCompletedAt(java.time.LocalDateTime.now());
            progress.setPointsEarned(progress.getTask().getPoints());
            
            logger.info("Task auto-completed: User={}, Task={}", 
                       progress.getUser().getUsername(), 
                       progress.getTask().getTaskId());
        }
    }
}
