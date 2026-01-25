import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaVideo, 
  FaProjectDiagram, 
  FaComments, 
  FaMobileAlt,
  FaCamera,
  FaChartBar,
  FaCog,
  FaShieldAlt
} from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const mainFeatures = [
    {
      icon: <FaVideo />,
      title: 'Real-time Pose Detection',
      description: 'Our AI system analyzes your yoga poses in real-time using your webcam, providing instant feedback on your form and alignment.',
      color: '#a177b4'
    },
    {
      icon: <FaProjectDiagram />,
      title: 'Skeleton Keypoint Tracking',
      description: 'Advanced pose estimation tracks 33 body keypoints to create a precise skeleton overlay, ensuring accurate pose analysis.',
      color: '#9fc5a7'
    },
    {
      icon: <FaComments />,
      title: 'Posture Correction Feedback',
      description: 'Receive detailed instructions on how to correct your posture, with specific guidance for each body part.',
      color: '#f39c12'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Beginner-Friendly UI',
      description: 'Clean and intuitive interface designed for users of all skill levels, making yoga practice accessible to everyone.',
      color: '#3498db'
    },
    {
      icon: <FaCamera />,
      title: 'Camera-based Practice',
      description: 'Simply use your device camera to practice yoga anywhere - no special equipment or sensors required.',
      color: '#e74c3c'
    },
    {
      icon: <FaChartBar />,
      title: 'ML-powered Accuracy',
      description: 'Our machine learning models continuously improve, providing increasingly accurate pose detection over time.',
      color: '#2ecc71'
    }
  ];

  const additionalFeatures = [
    {
      icon: <FaCog />,
      title: 'Customizable Settings',
      description: 'Adjust sensitivity, camera preferences, and feedback options to match your needs.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Privacy First',
      description: 'All processing happens locally - your video never leaves your device.'
    }
  ];

  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Discover</span>
          <h1>Platform Features</h1>
          <p>
            Explore the powerful features that make YogaGuru the ultimate 
            AI-powered yoga practice companion.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="feature-item card">
                <div 
                  className="feature-icon" 
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="section highlight-section gradient-bg-light">
        <div className="container">
          <div className="highlight-grid">
            <div className="highlight-content">
              <span className="section-label">Core Technology</span>
              <h2>Advanced Pose Estimation</h2>
              <p>
                Our system uses state-of-the-art TensorFlow.js and MediaPipe Pose 
                models to detect and track body keypoints with exceptional accuracy. 
                The AI analyzes your posture in real-time, comparing it against 
                ideal yoga poses to provide actionable feedback.
              </p>
              <ul className="highlight-list">
                <li>33 body keypoints tracked simultaneously</li>
                <li>Real-time processing at 30+ FPS</li>
                <li>Works with any standard webcam</li>
                <li>Browser-based - no installation required</li>
              </ul>
              <Link to="/pose-detection" className="btn btn-primary">
                Try It Now
              </Link>
            </div>
            <div className="highlight-visual">
              <div className="pose-demo">
                <div className="skeleton-preview">
                  <svg viewBox="0 0 200 300" fill="none">
                    <circle cx="100" cy="30" r="20" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="100" y1="50" x2="100" y2="120" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="100" y1="70" x2="50" y2="100" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="100" y1="70" x2="150" y2="100" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="100" y1="120" x2="60" y2="200" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="100" y1="120" x2="140" y2="200" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="60" y1="200" x2="50" y2="280" stroke="#a177b4" strokeWidth="3"/>
                    <line x1="140" y1="200" x2="150" y2="280" stroke="#a177b4" strokeWidth="3"/>
                    <circle cx="100" cy="30" r="5" fill="#a177b4"/>
                    <circle cx="100" cy="70" r="5" fill="#a177b4"/>
                    <circle cx="50" cy="100" r="5" fill="#a177b4"/>
                    <circle cx="150" cy="100" r="5" fill="#a177b4"/>
                    <circle cx="100" cy="120" r="5" fill="#a177b4"/>
                    <circle cx="60" cy="200" r="5" fill="#a177b4"/>
                    <circle cx="140" cy="200" r="5" fill="#a177b4"/>
                    <circle cx="50" cy="280" r="5" fill="#a177b4"/>
                    <circle cx="150" cy="280" r="5" fill="#a177b4"/>
                  </svg>
                </div>
                <div className="demo-labels">
                  <span className="label label-1">Head Position</span>
                  <span className="label label-2">Shoulder Alignment</span>
                  <span className="label label-3">Hip Angle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span>More Features</span>
            <h2>Designed for Your Practice</h2>
          </div>
          <div className="additional-grid">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="additional-card">
                <div className="icon-box">
                  {feature.icon}
                </div>
                <div className="additional-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Experience All Features</h2>
          <p>Start your AI-guided yoga practice and discover the full potential of YogaGuru.</p>
          <Link to="/pose-detection" className="btn btn-primary">
            Start Pose Detection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
