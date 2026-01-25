const express = require('express');
const router = express.Router();

// Sample yoga poses data
const yogaPoses = [
  {
    id: 1,
    name: 'Tadasana',
    englishName: 'Mountain Pose',
    difficulty: 'Beginner',
    category: 'Standing',
    description: 'A foundational standing pose that improves posture and balance.',
    benefits: ['Improves posture', 'Strengthens thighs', 'Promotes balance'],
    instructions: [
      'Stand with feet together',
      'Distribute weight evenly',
      'Arms at sides, palms facing forward',
      'Engage thigh muscles',
      'Lengthen spine'
    ],
    keypoints: {
      shoulderAngle: 180,
      hipAngle: 180,
      kneeAngle: 180
    }
  },
  {
    id: 2,
    name: 'Vrikshasana',
    englishName: 'Tree Pose',
    difficulty: 'Beginner',
    category: 'Balancing',
    description: 'A balancing pose that strengthens legs and improves focus.',
    benefits: ['Improves balance', 'Strengthens legs', 'Opens hips'],
    instructions: [
      'Stand on one leg',
      'Place foot on inner thigh',
      'Hands in prayer position',
      'Focus on a fixed point',
      'Hold for 30 seconds'
    ],
    keypoints: {
      standingLegAngle: 180,
      bentLegAngle: 90,
      armAngle: 90
    }
  },
  {
    id: 3,
    name: 'Trikonasana',
    englishName: 'Triangle Pose',
    difficulty: 'Intermediate',
    category: 'Standing',
    description: 'A standing pose that stretches the legs and torso.',
    benefits: ['Stretches hamstrings', 'Opens chest', 'Strengthens legs'],
    instructions: [
      'Stand with legs wide apart',
      'Turn one foot out 90 degrees',
      'Extend arms parallel to floor',
      'Reach down to ankle',
      'Extend other arm upward'
    ],
    keypoints: {
      legAngle: 90,
      torsoAngle: 45,
      armAngle: 180
    }
  },
  {
    id: 4,
    name: 'Virabhadrasana',
    englishName: 'Warrior Pose',
    difficulty: 'Intermediate',
    category: 'Standing',
    description: 'A powerful standing pose that builds strength and stamina.',
    benefits: ['Strengthens legs', 'Opens hips', 'Builds endurance'],
    instructions: [
      'Step feet 4 feet apart',
      'Turn front foot out 90 degrees',
      'Bend front knee to 90 degrees',
      'Extend arms overhead',
      'Gaze forward'
    ],
    keypoints: {
      frontKneeAngle: 90,
      backLegAngle: 180,
      armAngle: 180
    }
  },
  {
    id: 5,
    name: 'Bhujangasana',
    englishName: 'Cobra Pose',
    difficulty: 'Beginner',
    category: 'Backbend',
    description: 'A gentle backbend that opens the chest and strengthens the spine.',
    benefits: ['Opens chest', 'Strengthens spine', 'Improves flexibility'],
    instructions: [
      'Lie face down',
      'Place hands under shoulders',
      'Press palms into floor',
      'Lift chest off ground',
      'Keep elbows close to body'
    ],
    keypoints: {
      spineAngle: 45,
      armAngle: 135,
      neckAngle: 30
    }
  }
];

// Get all poses
router.get('/', (req, res) => {
  res.json(yogaPoses);
});

// Get pose by ID
router.get('/:id', (req, res) => {
  const pose = yogaPoses.find(p => p.id === parseInt(req.params.id));
  if (!pose) {
    return res.status(404).json({ error: 'Pose not found' });
  }
  res.json(pose);
});

// Get poses by difficulty
router.get('/difficulty/:level', (req, res) => {
  const poses = yogaPoses.filter(
    p => p.difficulty.toLowerCase() === req.params.level.toLowerCase()
  );
  res.json(poses);
});

// Get poses by category
router.get('/category/:category', (req, res) => {
  const poses = yogaPoses.filter(
    p => p.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(poses);
});

// Submit pose detection result
router.post('/detect', (req, res) => {
  try {
    const { poseId, keypoints, accuracy } = req.body;
    
    // In production, store results and calculate score
    const pose = yogaPoses.find(p => p.id === poseId);
    
    if (!pose) {
      return res.status(404).json({ error: 'Pose not found' });
    }

    // Simulated feedback
    const feedback = [];
    if (accuracy < 80) {
      feedback.push('Adjust your shoulder alignment');
      feedback.push('Keep your spine straighter');
    } else if (accuracy < 90) {
      feedback.push('Good form! Minor adjustment needed');
    } else {
      feedback.push('Excellent pose! Great alignment');
    }

    res.json({
      pose: pose.name,
      accuracy,
      feedback,
      score: Math.round(accuracy),
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
