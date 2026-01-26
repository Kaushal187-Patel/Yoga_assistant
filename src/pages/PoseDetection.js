import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './PoseDetection.css';

const PoseDetection = () => {
  const navigate = useNavigate();
  const [allPoses, setAllPoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Helper function to get pose image (same as CategoryDetail)
  const getPoseImage = (poseId, poseName) => {
    const directImageMap = {
      'Tadasana': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop&auto=format&q=80',
      'Vrikshasana': 'https://images.unsplash.com/photo-1758274525911-402f99afec14?w=600&h=400&fit=crop&auto=format&q=80',
      'Bhujangasana': 'https://images.unsplash.com/photo-1717821552922-61e18814a44a?w=600&h=400&fit=crop&auto=format&q=80',
      'Setu Bandhasana': 'https://images.unsplash.com/photo-1767611086180-6b1176976371?w=600&h=400&fit=crop&auto=format&q=80',
      'Virabhadrasana': 'https://images.unsplash.com/photo-1758599878236-47f6a918aed2?w=600&h=400&fit=crop&auto=format&q=80',
      'Anjaneyasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Paschimottanasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Ardha Matsyendrasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Gomukhasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Garudasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Supta Padangusthasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Marjariasana': 'https://images.unsplash.com/photo-1758599881262-7b79a56ac284?w=600&h=400&fit=crop&auto=format&q=80',
      'Pavanamuktasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Uttanasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Viparita Karani': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      'Trikonasana': 'https://images.unsplash.com/photo-1767611090899-163209a4ead1?w=600&h=400&fit=crop&auto=format&q=80',
      'Adho Mukha Svanasana': 'https://images.unsplash.com/photo-1767611121194-3cb554c9a9ec?w=600&h=400&fit=crop&auto=format&q=80',
      'Surya Namaskar': 'https://images.unsplash.com/photo-1606663368493-131f4f97c095?w=600&h=400&fit=crop&auto=format&q=80',
      'Balasana': 'https://images.unsplash.com/photo-1767611118672-d3887038786c?w=600&h=400&fit=crop&auto=format&q=80',
      'Padmasana': 'https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?w=600&h=400&fit=crop&auto=format&q=80',
      'Vajrasana': 'https://images.unsplash.com/photo-1697274834392-04ff3b76ef20?w=600&h=400&fit=crop&auto=format&q=80',
    };
    
    if (directImageMap[poseName]) {
      return directImageMap[poseName];
    }
    
    const englishName = poseName.split('(')[1]?.split(')')[0]?.trim() || 
                       poseName.split('-')[1]?.trim() || 
                       'yoga pose';
    
    const searchTerm = englishName.toLowerCase()
      .replace(/\s+/g, '%20')
      .replace(/[^a-z0-9%]/g, '');
    
    return `https://source.unsplash.com/600x400/?yoga%20${searchTerm}&sig=${poseId}`;
  };

  // Extract all unique poses from CategoryDetail's poseData structure
  useEffect(() => {
    // Sample poses - in production, this would be extracted from CategoryDetail's poseData
    // For now, we'll use a representative sample that covers the main poses
    const samplePoses = [
      {
        id: 1,
        name: 'ભુજંગાસન (Bhujangasana) - Cobra Pose',
        image: getPoseImage(1, 'Bhujangasana'),
        description: 'A gentle backbend that strengthens the spine and opens the chest. This pose helps relieve back pain by stretching the front body and strengthening the back muscles.',
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        category: 'Pain Relief'
      },
      {
        id: 2,
        name: 'વીરભદ્રાસન II (Virabhadrasana II) - Warrior II',
        image: 'https://images.unsplash.com/photo-1758599878236-47f6a918aed2?w=600&h=400&fit=crop&auto=format&q=80',
        description: 'A powerful standing pose that strengthens the legs and opens the hips.',
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        category: 'Pain Relief'
      },
      {
        id: 3,
        name: 'માર્જરીઆસન (Marjariasana) - Cat-Cow Pose',
        image: getPoseImage(3, 'Marjariasana'),
        description: 'A gentle flowing movement that warms up the spine.',
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        category: 'Pain Relief'
      },
      {
        id: 4,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(4, 'Setu Bandhasana'),
        description: 'A gentle backbend that strengthens the back muscles.',
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        category: 'Pain Relief'
      },
      {
        id: 5,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(14, 'Trikonasana'),
        description: 'A standing pose that strengthens legs and relieves back pain.',
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        category: 'Pain Relief'
      },
      {
        id: 6,
        name: 'તાડાસન (Tadasana) - Mountain Pose',
        image: getPoseImage(63, 'Tadasana'),
        description: 'A foundational standing pose that improves posture.',
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        category: 'Age Groups'
      },
      {
        id: 7,
        name: 'વૃક્ષાસન (Vrikshasana) - Tree Pose',
        image: getPoseImage(64, 'Vrikshasana'),
        description: 'A balancing pose that strengthens legs and improves focus.',
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        category: 'Age Groups'
      },
      {
        id: 8,
        name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
        image: getPoseImage(15, 'Adho Mukha Svanasana'),
        description: 'An inversion that strengthens the entire body.',
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        category: 'Pain Relief'
      },
      {
        id: 9,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(16, 'Surya Namaskar'),
        description: 'A complete sequence of 12 poses for full-body workout.',
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        category: 'Disease-Specific'
      },
      {
        id: 10,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(48, 'Balasana'),
        description: 'A restorative pose that calms the mind and stretches the back.',
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        category: 'Disease-Specific'
      },
      {
        id: 11,
        name: 'પદ્માસન (Padmasana) - Lotus Pose',
        image: getPoseImage(34, 'Padmasana'),
        description: 'A seated meditation pose that promotes calmness.',
        difficulty: 'Intermediate',
        duration: '5-30 minutes',
        category: 'Meditation'
      },
      {
        id: 12,
        name: 'વજ્રાસન (Vajrasana) - Thunderbolt Pose',
        image: getPoseImage(23, 'Vajrasana'),
        description: 'A seated pose that aids digestion and meditation.',
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        category: 'Disease-Specific'
      }
    ];
    
    setAllPoses(samplePoses);
  }, []);

  const handlePoseClick = (pose) => {
    navigate(`/pose/${pose.id}`, { 
      state: { pose: pose } 
    });
  };

  const filteredPoses = allPoses.filter(pose => {
    const matchesSearch = pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pose.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || 
                              pose.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="pose-detection-page">
      {/* Hero Section */}
      <section className="page-hero compact">
        <div className="container">
          <h1>Yoga Pose Library</h1>
          <p>Explore and practice yoga poses with real-time AI feedback</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section filter-section">
        <div className="container">
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search poses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-box">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <p className="results-count">{filteredPoses.length} pose{filteredPoses.length !== 1 ? 's' : ''} found</p>
        </div>
      </section>

      {/* Poses Grid Section */}
      <section className="section poses-grid-section">
        <div className="container">
          <div className="poses-grid">
            {filteredPoses.map((pose) => (
              <div 
                key={pose.id} 
                className="pose-card-clickable"
                onClick={() => handlePoseClick(pose)}
              >
                <div className="pose-image-container">
                  <img 
                    src={pose.image} 
                    alt={pose.name} 
                    className="pose-image"
                    loading="lazy"
                    onError={(e) => {
                      const fallbackUrl = `https://source.unsplash.com/400x300/?yoga&sig=${pose.id}`;
                      e.target.src = fallbackUrl;
                    }}
                  />
                  <span className={`pose-difficulty-badge ${pose.difficulty.toLowerCase()}`}>
                    {pose.difficulty}
                  </span>
                </div>
                
                <div className="pose-content">
                  <h3 className="pose-name">{pose.name}</h3>
                  <p className="pose-description">{pose.description}</p>
                  <div className="pose-meta">
                    <span className="pose-duration">⏱ {pose.duration}</span>
                    <span className="pose-category">{pose.category}</span>
                  </div>
                  <div className="pose-action">
                    <span>View Details <FaArrowRight /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPoses.length === 0 && (
            <div className="no-poses-found">
              <p>No poses found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="section tips-section gradient-bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Tips for Best Results</h2>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-number">1</div>
              <h4>Proper Lighting</h4>
              <p>Ensure you have adequate lighting. Natural light works best for accurate detection.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">2</div>
              <h4>Clear Background</h4>
              <p>A plain background helps the AI distinguish your body more accurately.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">3</div>
              <h4>Full Body View</h4>
              <p>Position yourself so your entire body is visible in the camera frame.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">4</div>
              <h4>Slow Movements</h4>
              <p>Move slowly into poses to allow the system to track your movements accurately.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoseDetection;
