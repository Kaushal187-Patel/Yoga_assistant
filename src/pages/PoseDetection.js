import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaPlay, FaStop, FaCamera, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './PoseDetection.css';

const PoseDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [currentPose, setCurrentPose] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState([]);

  const yogaPoses = [
    { name: 'Tadasana (Mountain Pose)', difficulty: 'Beginner' },
    { name: 'Vrikshasana (Tree Pose)', difficulty: 'Beginner' },
    { name: 'Trikonasana (Triangle Pose)', difficulty: 'Intermediate' },
    { name: 'Virabhadrasana (Warrior Pose)', difficulty: 'Intermediate' },
    { name: 'Bhujangasana (Cobra Pose)', difficulty: 'Beginner' },
  ];

  const instructions = [
    'Stand 6-8 feet away from the camera',
    'Ensure your full body is visible in the frame',
    'Make sure you have good lighting',
    'Wear fitted clothing for better detection',
    'Start with basic poses and progress gradually'
  ];

  const handleUserMedia = useCallback(() => {
    setHasPermission(true);
  }, []);

  const handleUserMediaError = useCallback(() => {
    setHasPermission(false);
  }, []);

  const startDetection = () => {
    setIsRunning(true);
    simulateDetection();
  };

  const stopDetection = () => {
    setIsRunning(false);
    setCurrentPose(null);
    setAccuracy(0);
    setFeedback([]);
  };

  const simulateDetection = () => {
    // Simulated pose detection - in production, this would use TensorFlow.js
    const randomPose = yogaPoses[Math.floor(Math.random() * yogaPoses.length)];
    const randomAccuracy = Math.floor(Math.random() * 30) + 70;
    
    setCurrentPose(randomPose);
    setAccuracy(randomAccuracy);
    
    const feedbackMessages = [];
    if (randomAccuracy < 80) {
      feedbackMessages.push('Adjust your shoulder alignment');
      feedbackMessages.push('Keep your spine straight');
    } else if (randomAccuracy < 90) {
      feedbackMessages.push('Good form! Slight adjustment needed in hip position');
    } else {
      feedbackMessages.push('Excellent pose! Great alignment');
    }
    setFeedback(feedbackMessages);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(simulateDetection, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const getAccuracyColor = () => {
    if (accuracy >= 90) return '#2ecc71';
    if (accuracy >= 75) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="pose-detection-page">
      {/* Hero Section */}
      <section className="page-hero compact">
        <div className="container">
          <h1>Yoga Pose Detection</h1>
          <p>Practice yoga with real-time AI feedback and posture correction</p>
        </div>
      </section>

      {/* Main Detection Section */}
      <section className="section detection-section">
        <div className="container">
          <div className="detection-grid">
            {/* Webcam Container */}
            <div className="webcam-wrapper">
              <div className="webcam-container">
                {hasPermission === false ? (
                  <div className="permission-denied">
                    <FaExclamationTriangle />
                    <h3>Camera Access Denied</h3>
                    <p>Please enable camera permissions to use pose detection.</p>
                  </div>
                ) : (
                  <>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      mirrored={true}
                      onUserMedia={handleUserMedia}
                      onUserMediaError={handleUserMediaError}
                      className="webcam-video"
                      videoConstraints={{
                        width: 640,
                        height: 480,
                        facingMode: "user"
                      }}
                    />
                    <canvas ref={canvasRef} className="pose-canvas" />
                    
                    {isRunning && currentPose && (
                      <div className="pose-overlay">
                        <div className="pose-info-box">
                          <div className="pose-name">
                            <h3>{currentPose.name}</h3>
                            <span className="difficulty">{currentPose.difficulty}</span>
                          </div>
                          <div className="accuracy-display">
                            <div 
                              className="accuracy-circle"
                              style={{ borderColor: getAccuracyColor() }}
                            >
                              <span style={{ color: getAccuracyColor() }}>{accuracy}%</span>
                            </div>
                            <p>Accuracy</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Control Buttons */}
              <div className="control-buttons">
                {!isRunning ? (
                  <button 
                    className="btn btn-primary start-btn"
                    onClick={startDetection}
                    disabled={hasPermission === false}
                  >
                    <FaPlay /> Start Detection
                  </button>
                ) : (
                  <button 
                    className="btn btn-danger stop-btn"
                    onClick={stopDetection}
                  >
                    <FaStop /> Stop Detection
                  </button>
                )}
                <button className="btn btn-outline capture-btn">
                  <FaCamera /> Capture Pose
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="detection-sidebar">
              {/* Feedback Panel */}
              <div className="sidebar-panel feedback-panel">
                <h3><FaInfoCircle /> Feedback</h3>
                {feedback.length > 0 ? (
                  <ul className="feedback-list">
                    {feedback.map((msg, index) => (
                      <li key={index} className={accuracy >= 90 ? 'success' : 'warning'}>
                        {accuracy >= 90 ? <FaCheckCircle /> : <FaExclamationTriangle />}
                        <span>{msg}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-feedback">
                    Start detection to receive real-time feedback on your poses.
                  </p>
                )}
              </div>

              {/* Instructions Panel */}
              <div className="sidebar-panel instructions-panel">
                <h3>Instructions</h3>
                <ul>
                  {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>

              {/* Available Poses */}
              <div className="sidebar-panel poses-panel">
                <h3>Available Poses</h3>
                <div className="poses-list">
                  {yogaPoses.map((pose, index) => (
                    <div key={index} className="pose-tag">
                      <span className="pose-name">{pose.name}</span>
                      <span className={`pose-difficulty ${pose.difficulty.toLowerCase()}`}>
                        {pose.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
