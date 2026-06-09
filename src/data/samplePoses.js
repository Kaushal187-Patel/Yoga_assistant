// Shared sample pose catalog used by Pose Library and Pose Detail fallback routing.
export const getPoseImage = (poseId, poseName) => {
  const directImageMap = {
    Tadasana: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop&auto=format&q=80',
    Vrikshasana: 'https://images.unsplash.com/photo-1758274525911-402f99afec14?w=600&h=400&fit=crop&auto=format&q=80',
    Bhujangasana: 'https://images.unsplash.com/photo-1717821552922-61e18814a44a?w=600&h=400&fit=crop&auto=format&q=80',
    'Setu Bandhasana': 'https://images.unsplash.com/photo-1767611086180-6b1176976371?w=600&h=400&fit=crop&auto=format&q=80',
    Virabhadrasana: 'https://images.unsplash.com/photo-1758599878236-47f6a918aed2?w=600&h=400&fit=crop&auto=format&q=80',
    Anjaneyasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    Paschimottanasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    'Ardha Matsyendrasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    Gomukhasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    Garudasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    SuptaPadangusthasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    Marjariasana: 'https://images.unsplash.com/photo-1758599881262-7b79a56ac284?w=600&h=400&fit=crop&auto=format&q=80',
    Pavanamuktasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    Uttanasana: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    ViparitaKarani: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
    Trikonasana: 'https://images.unsplash.com/photo-1767611090899-163209a4ead1?w=600&h=400&fit=crop&auto=format&q=80',
    AdhoMukhaSvanasana: 'https://images.unsplash.com/photo-1767611121194-3cb554c9a9ec?w=600&h=400&fit=crop&auto=format&q=80',
    SuryaNamaskar: 'https://images.unsplash.com/photo-1606663368493-131f4f97c095?w=600&h=400&fit=crop&auto=format&q=80',
    Balasana: 'https://images.unsplash.com/photo-1767611118672-d3887038786c?w=600&h=400&fit=crop&auto=format&q=80',
    Padmasana: 'https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?w=600&h=400&fit=crop&auto=format&q=80',
    Vajrasana: 'https://images.unsplash.com/photo-1697274834392-04ff3b76ef20?w=600&h=400&fit=crop&auto=format&q=80',
  };

  const normalized = poseName.replace(/[^A-Za-z]/g, '');
  if (directImageMap[normalized]) {
    return directImageMap[normalized];
  }

  const fallbackTerm = poseName.toLowerCase().replace(/\s+/g, '%20').replace(/[^a-z0-9%]/g, '');
  return `https://source.unsplash.com/600x400/?yoga%20${fallbackTerm}&sig=${poseId}`;
};

export const SAMPLE_POSES = [
  {
    id: 1,
    name: 'ભુજંગાસન (Bhujangasana) - Cobra Pose',
    image: getPoseImage(1, 'Bhujangasana'),
    description:
      'A gentle backbend that strengthens the spine and opens the chest. This pose helps relieve back pain by stretching the front body and strengthening the back muscles.',
    difficulty: 'Beginner',
    duration: '30-60 seconds',
    category: 'Pain Relief',
  },
  {
    id: 2,
    name: 'વીરભદ્રાસન II (Virabhadrasana II) - Warrior II',
    image: getPoseImage(2, 'Virabhadrasana'),
    description: 'A powerful standing pose that strengthens the legs and opens the hips.',
    difficulty: 'Intermediate',
    duration: '30-60 seconds',
    category: 'Pain Relief',
  },
  {
    id: 3,
    name: 'માર્જરીઆસન (Marjariasana) - Cat-Cow Pose',
    image: getPoseImage(3, 'Marjariasana'),
    description: 'A gentle flowing movement that warms up the spine.',
    difficulty: 'Beginner',
    duration: '1-2 minutes',
    category: 'Pain Relief',
  },
  {
    id: 4,
    name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
    image: getPoseImage(4, 'Setu Bandhasana'),
    description: 'A gentle backbend that strengthens the back muscles.',
    difficulty: 'Beginner',
    duration: '30-60 seconds',
    category: 'Pain Relief',
  },
  {
    id: 5,
    name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
    image: getPoseImage(5, 'Trikonasana'),
    description: 'A standing pose that strengthens legs and relieves back pain.',
    difficulty: 'Intermediate',
    duration: '30-60 seconds',
    category: 'Pain Relief',
  },
  {
    id: 6,
    name: 'તાડાસન (Tadasana) - Mountain Pose',
    image: getPoseImage(6, 'Tadasana'),
    description: 'A foundational standing pose that improves posture.',
    difficulty: 'Beginner',
    duration: '30-60 seconds',
    category: 'Age Groups',
  },
  {
    id: 7,
    name: 'વૃક્ષાસન (Vrikshasana) - Tree Pose',
    image: getPoseImage(7, 'Vrikshasana'),
    description: 'A balancing pose that strengthens legs and improves focus.',
    difficulty: 'Beginner',
    duration: '30-60 seconds',
    category: 'Age Groups',
  },
  {
    id: 8,
    name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
    image: getPoseImage(8, 'Adho Mukha Svanasana'),
    description: 'An inversion that strengthens the entire body.',
    difficulty: 'Beginner',
    duration: '30-60 seconds',
    category: 'Pain Relief',
  },
  {
    id: 9,
    name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
    image: getPoseImage(9, 'Surya Namaskar'),
    description: 'A complete sequence of 12 poses for full-body workout.',
    difficulty: 'Intermediate',
    duration: '5-10 minutes',
    category: 'Disease-Specific',
  },
  {
    id: 10,
    name: "બાલાસન (Balasana) - Child's Pose",
    image: getPoseImage(10, 'Balasana'),
    description: 'A restorative pose that calms the mind and stretches the back.',
    difficulty: 'Beginner',
    duration: '1-3 minutes',
    category: 'Disease-Specific',
  },
  {
    id: 11,
    name: 'પદ્માસન (Padmasana) - Lotus Pose',
    image: getPoseImage(11, 'Padmasana'),
    description: 'A seated meditation pose that promotes calmness.',
    difficulty: 'Intermediate',
    duration: '5-30 minutes',
    category: 'Meditation',
  },
  {
    id: 12,
    name: 'વજ્રાસન (Vajrasana) - Thunderbolt Pose',
    image: getPoseImage(12, 'Vajrasana'),
    description: 'A seated pose that aids digestion and meditation.',
    difficulty: 'Beginner',
    duration: '5-30 minutes',
    category: 'Disease-Specific',
  },
];
