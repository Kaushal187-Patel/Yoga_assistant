-- YOGA GURU Database Schema
-- Create and use database

CREATE DATABASE IF NOT EXISTS yoga_guru;
USE yoga_guru;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- YOGA POSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS yoga_poses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100) NOT NULL,
    sanskrit_name VARCHAR(100),
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    benefits JSON,
    instructions JSON,
    keypoints JSON,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_difficulty (difficulty),
    INDEX idx_category (category)
);

-- ============================================
-- PRACTICE SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS practice_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    duration_minutes INT DEFAULT 0,
    total_poses INT DEFAULT 0,
    average_accuracy DECIMAL(5,2) DEFAULT 0.00,
    calories_burned INT DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_start_time (start_time)
);

-- ============================================
-- POSE ATTEMPTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS pose_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    user_id INT NOT NULL,
    pose_id INT NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    duration_seconds INT DEFAULT 0,
    keypoints_data JSON,
    feedback JSON,
    screenshot_url VARCHAR(500),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES practice_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pose_id) REFERENCES yoga_poses(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_user_pose (user_id, pose_id),
    INDEX idx_attempted_at (attempted_at)
);

-- ============================================
-- USER PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pose_id INT NOT NULL,
    best_accuracy DECIMAL(5,2) DEFAULT 0.00,
    average_accuracy DECIMAL(5,2) DEFAULT 0.00,
    total_attempts INT DEFAULT 0,
    total_time_seconds INT DEFAULT 0,
    mastery_level ENUM('Beginner', 'Learning', 'Intermediate', 'Advanced', 'Master') DEFAULT 'Beginner',
    last_practiced TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pose_id) REFERENCES yoga_poses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_pose (user_id, pose_id),
    INDEX idx_user_id (user_id),
    INDEX idx_mastery (mastery_level)
);

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    points INT DEFAULT 0,
    criteria JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- USER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    achievement_id INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (user_id, achievement_id)
);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('pending', 'read', 'replied', 'archived') DEFAULT 'pending',
    admin_notes TEXT,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- FEEDBACK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    feedback_type ENUM('bug', 'feature', 'general', 'complaint') DEFAULT 'general',
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
 '["Improves posture", "Strengthens thighs", "Promotes balance"]',
 '["Stand with feet together", "Distribute weight evenly", "Arms at sides", "Engage thigh muscles", "Lengthen spine"]'),

('Vrikshasana', 'Tree Pose', 'Beginner', 'Balancing',
 'A balancing pose that strengthens legs and improves focus.',
 '["Improves balance", "Strengthens legs", "Opens hips"]',
 '["Stand on one leg", "Place foot on inner thigh", "Hands in prayer position", "Focus on a fixed point"]'),

('Trikonasana', 'Triangle Pose', 'Intermediate', 'Standing',
 'A standing pose that stretches the legs and torso.',
 '["Stretches hamstrings", "Opens chest", "Strengthens legs"]',
 '["Stand with legs wide apart", "Turn one foot out 90 degrees", "Extend arms parallel to floor", "Reach down to ankle"]'),

('Virabhadrasana', 'Warrior Pose', 'Intermediate', 'Standing',
 'A powerful standing pose that builds strength and stamina.',
 '["Strengthens legs", "Opens hips", "Builds endurance"]',
 '["Step feet 4 feet apart", "Turn front foot out 90 degrees", "Bend front knee to 90 degrees", "Extend arms overhead"]'),

('Bhujangasana', 'Cobra Pose', 'Beginner', 'Backbend',
 'A gentle backbend that opens the chest and strengthens the spine.',
 '["Opens chest", "Strengthens spine", "Improves flexibility"]',
 '["Lie face down", "Place hands under shoulders", "Press palms into floor", "Lift chest off ground"]'),

('Padmasana', 'Lotus Pose', 'Intermediate', 'Seated',
 'A classic meditation pose that calms the mind.',
 '["Calms mind", "Opens hips", "Improves posture"]',
 '["Sit with legs extended", "Place right foot on left thigh", "Place left foot on right thigh", "Rest hands on knees"]'),

('Vajrasana', 'Thunderbolt Pose', 'Beginner', 'Seated',
 'A kneeling pose that aids digestion.',
 '["Aids digestion", "Strengthens thighs", "Calms mind"]',
 '["Kneel on floor", "Sit back on heels", "Keep spine straight", "Rest hands on thighs"]'),

('Dhanurasana', 'Bow Pose', 'Intermediate', 'Backbend',
 'A backbend that stretches the entire front body.',
 '["Stretches front body", "Strengthens back", "Improves posture"]',
 '["Lie face down", "Bend knees", "Reach back to hold ankles", "Lift chest and thighs"]'),

('Halasana', 'Plow Pose', 'Advanced', 'Inversion',
 'An inverted pose that calms the nervous system.',
 '["Calms nervous system", "Stretches spine", "Stimulates thyroid"]',
 '["Lie on back", "Lift legs overhead", "Lower feet behind head", "Support back with hands"]'),

('Chakrasana', 'Wheel Pose', 'Advanced', 'Backbend',
 'A full backbend that opens the entire front body.',
 '["Opens chest", "Strengthens arms and legs", "Increases energy"]',
 '["Lie on back", "Place hands by ears", "Press up into full backbend", "Straighten arms"]');

-- Sample Achievements
INSERT INTO achievements (name, description, points) VALUES
('First Steps', 'Complete your first yoga session', 10),
('Week Warrior', 'Practice for 7 consecutive days', 50),
('Pose Master', 'Achieve 95%+ accuracy on any pose', 25),
('Hour Power', 'Complete 60 minutes of practice in a day', 30),
('Flexibility Friend', 'Complete 50 total poses', 40),
('Consistency King', 'Practice for 30 consecutive days', 100),
('Perfect Form', 'Get 100% accuracy on any pose', 50),
('Yoga Explorer', 'Try all available poses', 75);

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
