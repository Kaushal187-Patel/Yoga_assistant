const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, (req, res) => {
  try {
    // In production, fetch from database
    res.json({
      id: req.userId,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      stats: {
        totalSessions: 25,
        totalPoses: 150,
        averageAccuracy: 87.5,
        streak: 7
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, (req, res) => {
  try {
    const { name, email } = req.body;
    
    // In production, update in database
    res.json({
      message: 'Profile updated successfully',
      user: { name, email }
    });
  } catch (error) {
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
