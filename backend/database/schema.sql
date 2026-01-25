-- YOGA GURU Database Schema (PostgreSQL)
-- Connect to the database: \c Yoga_guru

-- ============================================
-- CREATE ENUMS
-- ============================================
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE difficulty_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE mastery_level AS ENUM ('Beginner', 'Learning', 'Intermediate', 'Advanced', 'Master');
CREATE TYPE message_status AS ENUM ('pending', 'read', 'replied', 'archived');
CREATE TYPE feedback_type AS ENUM ('bug', 'feature', 'general', 'complaint');

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role user_role DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

CREATE INDEX IF NOT EXISTS idx_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_created_at ON users(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- YOGA POSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS yoga_poses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100) NOT NULL,
    sanskrit_name VARCHAR(100),
    difficulty difficulty_level NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    benefits JSONB,
    instructions JSONB,
    keypoints JSONB,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_difficulty ON yoga_poses(difficulty);
CREATE INDEX IF NOT EXISTS idx_category ON yoga_poses(category);

-- Trigger for yoga_poses table
CREATE TRIGGER update_yoga_poses_updated_at BEFORE UPDATE ON yoga_poses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PRACTICE SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS practice_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    duration_minutes INTEGER DEFAULT 0,
    total_poses INTEGER DEFAULT 0,
    average_accuracy DECIMAL(5,2) DEFAULT 0.00,
    calories_burned INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_start_time ON practice_sessions(start_time);

-- ============================================
-- POSE ATTEMPTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS pose_attempts (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    pose_id INTEGER NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    duration_seconds INTEGER DEFAULT 0,
    keypoints_data JSONB,
    feedback JSONB,
    screenshot_url VARCHAR(500),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES practice_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pose_id) REFERENCES yoga_poses(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_session_id ON pose_attempts(session_id);
CREATE INDEX IF NOT EXISTS idx_user_pose ON pose_attempts(user_id, pose_id);
CREATE INDEX IF NOT EXISTS idx_attempted_at ON pose_attempts(attempted_at);

-- ============================================
-- USER PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    pose_id INTEGER NOT NULL,
    best_accuracy DECIMAL(5,2) DEFAULT 0.00,
    average_accuracy DECIMAL(5,2) DEFAULT 0.00,
    total_attempts INTEGER DEFAULT 0,
    total_time_seconds INTEGER DEFAULT 0,
    mastery_level mastery_level DEFAULT 'Beginner',
    last_practiced TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pose_id) REFERENCES yoga_poses(id) ON DELETE CASCADE,
    UNIQUE (user_id, pose_id)
);

CREATE INDEX IF NOT EXISTS idx_user_id_progress ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_mastery ON user_progress(mastery_level);

-- Trigger for user_progress table
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    points INTEGER DEFAULT 0,
    criteria JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- USER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE (user_id, achievement_id)
);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status message_status DEFAULT 'pending',
    admin_notes TEXT,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_created_at_msg ON contact_messages(created_at);

-- ============================================
-- FEEDBACK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_type feedback_type DEFAULT 'general',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Sample Yoga Poses
INSERT INTO yoga_poses (name, english_name, difficulty, category, description, benefits, instructions) VALUES
('Tadasana', 'Mountain Pose', 'Beginner', 'Standing', 
 'A foundational standing pose that improves posture and balance.',
 '["Improves posture", "Strengthens thighs", "Promotes balance"]'::jsonb,
 '["Stand with feet together", "Distribute weight evenly", "Arms at sides", "Engage thigh muscles", "Lengthen spine"]'::jsonb),

('Vrikshasana', 'Tree Pose', 'Beginner', 'Balancing',
 'A balancing pose that strengthens legs and improves focus.',
 '["Improves balance", "Strengthens legs", "Opens hips"]'::jsonb,
 '["Stand on one leg", "Place foot on inner thigh", "Hands in prayer position", "Focus on a fixed point"]'::jsonb),

('Trikonasana', 'Triangle Pose', 'Intermediate', 'Standing',
 'A standing pose that stretches the legs and torso.',
 '["Stretches hamstrings", "Opens chest", "Strengthens legs"]'::jsonb,
 '["Stand with legs wide apart", "Turn one foot out 90 degrees", "Extend arms parallel to floor", "Reach down to ankle"]'::jsonb),

('Virabhadrasana', 'Warrior Pose', 'Intermediate', 'Standing',
 'A powerful standing pose that builds strength and stamina.',
 '["Strengthens legs", "Opens hips", "Builds endurance"]'::jsonb,
 '["Step feet 4 feet apart", "Turn front foot out 90 degrees", "Bend front knee to 90 degrees", "Extend arms overhead"]'::jsonb),

('Bhujangasana', 'Cobra Pose', 'Beginner', 'Backbend',
 'A gentle backbend that opens the chest and strengthens the spine.',
 '["Opens chest", "Strengthens spine", "Improves flexibility"]'::jsonb,
 '["Lie face down", "Place hands under shoulders", "Press palms into floor", "Lift chest off ground"]'::jsonb),

('Padmasana', 'Lotus Pose', 'Intermediate', 'Seated',
 'A classic meditation pose that calms the mind.',
 '["Calms mind", "Opens hips", "Improves posture"]'::jsonb,
 '["Sit with legs extended", "Place right foot on left thigh", "Place left foot on right thigh", "Rest hands on knees"]'::jsonb),

('Vajrasana', 'Thunderbolt Pose', 'Beginner', 'Seated',
 'A kneeling pose that aids digestion.',
 '["Aids digestion", "Strengthens thighs", "Calms mind"]'::jsonb,
 '["Kneel on floor", "Sit back on heels", "Keep spine straight", "Rest hands on thighs"]'::jsonb),

('Dhanurasana', 'Bow Pose', 'Intermediate', 'Backbend',
 'A backbend that stretches the entire front body.',
 '["Stretches front body", "Strengthens back", "Improves posture"]'::jsonb,
 '["Lie face down", "Bend knees", "Reach back to hold ankles", "Lift chest and thighs"]'::jsonb),

('Halasana', 'Plow Pose', 'Advanced', 'Inversion',
 'An inverted pose that calms the nervous system.',
 '["Calms nervous system", "Stretches spine", "Stimulates thyroid"]'::jsonb,
 '["Lie on back", "Lift legs overhead", "Lower feet behind head", "Support back with hands"]'::jsonb),

('Chakrasana', 'Wheel Pose', 'Advanced', 'Backbend',
 'A full backbend that opens the entire front body.',
 '["Opens chest", "Strengthens arms and legs", "Increases energy"]'::jsonb,
 '["Lie on back", "Place hands by ears", "Press up into full backbend", "Straighten arms"]'::jsonb)
ON CONFLICT DO NOTHING;

-- Sample Achievements
INSERT INTO achievements (name, description, points) VALUES
('First Steps', 'Complete your first yoga session', 10),
('Week Warrior', 'Practice for 7 consecutive days', 50),
('Pose Master', 'Achieve 95%+ accuracy on any pose', 25),
('Hour Power', 'Complete 60 minutes of practice in a day', 30),
('Flexibility Friend', 'Complete 50 total poses', 40),
('Consistency King', 'Practice for 30 consecutive days', 100),
('Perfect Form', 'Get 100% accuracy on any pose', 50),
('Yoga Explorer', 'Try all available poses', 75)
ON CONFLICT DO NOTHING;

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- User statistics view
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.id AS user_id,
    u.name,
    u.email,
    COUNT(DISTINCT ps.id) AS total_sessions,
    COALESCE(SUM(ps.duration_minutes), 0) AS total_practice_minutes,
    COALESCE(AVG(pa.accuracy), 0) AS overall_accuracy,
    COUNT(DISTINCT pa.pose_id) AS unique_poses_attempted,
    COUNT(pa.id) AS total_pose_attempts
FROM users u
LEFT JOIN practice_sessions ps ON u.id = ps.user_id
LEFT JOIN pose_attempts pa ON u.id = pa.user_id
GROUP BY u.id, u.name, u.email;

-- Pose popularity view
CREATE OR REPLACE VIEW pose_popularity AS
SELECT 
    yp.id AS pose_id,
    yp.name,
    yp.english_name,
    yp.difficulty,
    COUNT(pa.id) AS total_attempts,
    COALESCE(AVG(pa.accuracy), 0) AS average_accuracy
FROM yoga_poses yp
LEFT JOIN pose_attempts pa ON yp.id = pa.pose_id
GROUP BY yp.id, yp.name, yp.english_name, yp.difficulty
ORDER BY total_attempts DESC;
