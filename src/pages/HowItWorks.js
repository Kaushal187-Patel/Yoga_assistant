import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCamera, 
  FaUserAlt, 
  FaBrain, 
  FaCheckDouble,
  FaDesktop,
  FaArrowRight
} from 'react-icons/fa';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <FaCamera />,
      title: 'Open Camera',
      description: 'Grant camera access and position yourself in front of your device. Make sure you have enough space to perform yoga poses and good lighting for accurate detection.',
      tips: ['Stand 6-8 feet from camera', 'Ensure good lighting', 'Wear fitted clothing']
    },
    {
      number: '02',
      icon: <FaUserAlt />,
      title: 'Body Keypoint Detection',
      description: 'Our AI system automatically detects 33 key points on your body including joints, extremities, and facial landmarks to create a precise skeleton model.',
      tips: ['Stay within camera frame', 'Face the camera directly', 'Keep full body visible']
    },
    {
      number: '03',
      icon: <FaBrain />,
      title: 'AI Pose Analysis',
      description: 'The machine learning model analyzes the angles and positions of your keypoints, comparing them against our database of correct yoga poses.',
      tips: ['Hold poses steadily', 'Follow on-screen guidance', 'Move slowly for best detection']
    },
    {
      number: '04',
      icon: <FaCheckDouble />,
      title: 'Pose Classification',
      description: 'Your pose is classified and matched against known yoga asanas. The system determines which pose you\'re attempting and evaluates your accuracy.',
      tips: ['Start with basic poses', 'Practice one pose at a time', 'Be patient with learning']
    },
    {
      number: '05',
      icon: <FaDesktop />,
      title: 'Real-time Feedback',
      description: 'Receive instant visual and text feedback on your screen showing your accuracy percentage, corrections needed, and tips for improvement.',
      tips: ['Follow correction suggestions', 'Track your progress', 'Practice regularly']
    }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Step by Step</span>
          <h1>How It Works</h1>
          <p>
            Follow these simple steps to start practicing yoga with 
            AI-powered pose detection and real-time feedback.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section steps-section">
        <div className="container">
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className={`step-item ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="step-visual">
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon-container">
                    <div className="step-icon">
                      {step.icon}
                    </div>
                  </div>
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="step-tips">
                    <h4>Tips:</h4>
                    <ul>
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="section flow-section gradient-bg-light">
        <div className="container">
          <div className="section-title">
            <span>Visual Overview</span>
            <h2>The Detection Flow</h2>
          </div>
          <div className="flow-diagram">
            <div className="flow-item">
              <div className="flow-icon">
                <FaCamera />
              </div>
              <span>Camera Input</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">
                <FaUserAlt />
              </div>
              <span>Keypoint Detection</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">
                <FaBrain />
              </div>
              <span>ML Processing</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">
                <FaCheckDouble />
              </div>
              <span>Classification</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">
                <FaDesktop />
              </div>
              <span>Feedback Display</span>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section requirements-section">
        <div className="container">
          <div className="section-title">
            <span>Before You Start</span>
            <h2>Requirements</h2>
          </div>
          <div className="requirements-grid">
            <div className="requirement-card">
              <h3>Device</h3>
              <ul>
                <li>Computer, tablet, or smartphone</li>
                <li>Working webcam or front camera</li>
                <li>Modern web browser (Chrome, Firefox, Safari)</li>
              </ul>
            </div>
            <div className="requirement-card">
              <h3>Environment</h3>
              <ul>
                <li>Well-lit room</li>
                <li>Plain background preferred</li>
                <li>Enough space to move freely</li>
              </ul>
            </div>
            <div className="requirement-card">
              <h3>Attire</h3>
              <ul>
                <li>Comfortable, fitted clothing</li>
                <li>Avoid baggy clothes</li>
                <li>Contrasting colors to background</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Begin?</h2>
          <p>Start practicing yoga with real-time AI guidance now.</p>
          <Link to="/pose-detection" className="btn btn-primary">
            Start Pose Detection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
