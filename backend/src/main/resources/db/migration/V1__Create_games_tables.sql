-- Create game_scores table
CREATE TABLE IF NOT EXISTS game_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10000),
    max_score INTEGER CHECK (max_score >= 0),
    time_spent INTEGER CHECK (time_spent >= 0),
    moves_used INTEGER CHECK (moves_used >= 0),
    perfect_score BOOLEAN NOT NULL DEFAULT FALSE,
    points_earned INTEGER CHECK (points_earned >= 0),
    game_data TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_game_scores_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for game_scores table
CREATE INDEX IF NOT EXISTS idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_game_type ON game_scores(game_type);
CREATE INDEX IF NOT EXISTS idx_game_scores_created_at ON game_scores(created_at);
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score DESC);

-- Create daily_tasks table
CREATE TABLE IF NOT EXISTS daily_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    points INTEGER NOT NULL CHECK (points >= 0 AND points <= 1000),
    difficulty VARCHAR(20) NOT NULL,
    max_progress INTEGER NOT NULL CHECK (max_progress >= 1 AND max_progress <= 100),
    reward VARCHAR(100),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    task_type VARCHAR(50) NOT NULL,
    task_date DATE NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for daily_tasks table
CREATE INDEX IF NOT EXISTS idx_daily_tasks_date ON daily_tasks(task_date);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_type ON daily_tasks(task_type);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_active ON daily_tasks(active);

-- Create user_task_progress table
CREATE TABLE IF NOT EXISTS user_task_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    task_id UUID NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMP,
    points_earned INTEGER DEFAULT 0 CHECK (points_earned >= 0),
    task_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_task_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_task_progress_task FOREIGN KEY (task_id) REFERENCES daily_tasks(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_task_progress_user_task_date UNIQUE (user_id, task_id, task_date)
);

-- Create indexes for user_task_progress table
CREATE INDEX IF NOT EXISTS idx_user_task_progress_user_id ON user_task_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_task_progress_task_id ON user_task_progress(task_id);
CREATE INDEX IF NOT EXISTS idx_user_task_progress_date ON user_task_progress(task_date);
CREATE INDEX IF NOT EXISTS idx_user_task_progress_completed ON user_task_progress(completed);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_game_scores_updated_at 
    BEFORE UPDATE ON game_scores 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_tasks_updated_at 
    BEFORE UPDATE ON daily_tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_task_progress_updated_at 
    BEFORE UPDATE ON user_task_progress 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
