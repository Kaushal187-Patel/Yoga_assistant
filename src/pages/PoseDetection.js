import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { SAMPLE_POSES } from '../data/samplePoses';
import './PoseDetection.css';

const PoseDetection = () => {
  const navigate = useNavigate();
  const [allPoses, setAllPoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Load shared sample pose catalog.
  useEffect(() => {
    setAllPoses(SAMPLE_POSES);
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
