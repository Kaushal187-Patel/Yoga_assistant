const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { pool } = require('../config/database');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, created_at, avatar_url, role FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      avatar_url: user.avatar_url,
      role: user.role
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = await pool.query(
      'UPDATE users SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, name, email, created_at',
      [name.trim(), req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's yoga session history
router.get('/sessions', authMiddleware, (req, res) => {
  try {
    // Sample session data
    const sessions = [
      {
        id: 1,
        date: '2024-01-20',
        duration: 30,
        posesCompleted: 8,
        averageAccuracy: 85
      },
      {
        id: 2,
        date: '2024-01-21',
        duration: 45,
        posesCompleted: 12,
        averageAccuracy: 88
      },
      {
        id: 3,
        date: '2024-01-22',
        duration: 25,
        posesCompleted: 6,
        averageAccuracy: 91
      }
    ];

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's progress statistics
router.get('/progress', authMiddleware, (req, res) => {
  try {
    res.json({
      weeklyProgress: [75, 80, 82, 85, 88, 90, 91],
      totalPracticeTime: 450, // minutes
      mostPracticedPose: 'Tadasana',
      improvementRate: 12.5 // percentage
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
