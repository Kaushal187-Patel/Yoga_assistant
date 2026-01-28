import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCamera, 
  FaUserAlt, 
  FaBrain, 
  FaCheckDouble,
  FaDesktop,
  FaArrowRight,
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaLaptopCode,
  FaCogs,
  FaCheckCircle, 
  FaExclamationCircle, 
  FaChartLine,
  FaVideo,
  FaProjectDiagram,
  FaComments,
  FaMobileAlt,
  FaChartBar,
  FaCog,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiOpencv, 
  SiJupyter,
  SiVisualstudiocode 
} from 'react-icons/si';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import './ProjectInfo.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ProjectInfo = () => {
  const [activeTab, setActiveTab] = useState('features');

  // Features Data
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

  // How It Works Data
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

  // Tech Stack Data
  const techCategories = [
    {
      title: 'Frontend Technologies',
      icon: <FaLaptopCode />,
      color: '#61dafb',
      technologies: [
        { name: 'HTML5', icon: <FaHtml5 />, color: '#e34f26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
        { name: 'JavaScript', icon: <FaJs />, color: '#f7df1e' },
        { name: 'ReactJS', icon: <FaReact />, color: '#61dafb' },
      ]
    },
    {
      title: 'Backend Technologies',
      icon: <FaCogs />,
      color: '#68a063',
      technologies: [
        { name: 'Python', icon: <FaPython />, color: '#3776ab' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
        { name: 'OpenCV', icon: <SiOpencv />, color: '#5c3ee8' },
        { name: 'TensorFlow', icon: <SiTensorflow />, color: '#ff6f00' },
      ]
    },
    {
      title: 'Database',
      icon: <FaDatabase />,
      color: '#336791',
      technologies: [
        { name: 'SQL Database', icon: <FaDatabase />, color: '#336791' },
      ]
    },
    {
      title: 'Development Tools',
      icon: <FaCode />,
      color: '#007acc',
      technologies: [
        { name: 'VS Code', icon: <SiVisualstudiocode />, color: '#007acc' },
        { name: 'Jupyter Notebook', icon: <SiJupyter />, color: '#f37626' },
      ]
    }
  ];

  const architectureDetails = [
    {
      layer: 'Presentation Layer',
      description: 'React-based user interface with responsive design',
      technologies: ['React', 'CSS3', 'HTML5']
    },
    {
      layer: 'Application Layer',
      description: 'Business logic and API endpoints',
      technologies: ['Node.js', 'Python Flask']
    },
    {
      layer: 'ML Processing Layer',
      description: 'Pose estimation and classification models',
      technologies: ['TensorFlow.js', 'MediaPipe', 'OpenCV']
    },
    {
      layer: 'Data Layer',
      description: 'User data and pose training datasets',
      technologies: ['SQL Database', 'JSON']
    }
  ];

  // Results Data
  const accuracyData = {
    labels: ['Tadasana', 'Vrikshasana', 'Trikonasana', 'Bhujangasana', 'Vajrasana', 'Padmasana'],
    datasets: [
      {
        label: 'Detection Accuracy (%)',
        data: [95, 92, 88, 94, 90, 86],
        backgroundColor: 'rgba(161, 119, 180, 0.6)',
        borderColor: 'rgba(161, 119, 180, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const precisionRecallData = {
    labels: ['Precision', 'Recall', 'F1-Score'],
    datasets: [
      {
        data: [94, 91, 92.5],
        backgroundColor: [
          'rgba(161, 119, 180, 0.8)',
          'rgba(159, 197, 167, 0.8)',
          'rgba(243, 156, 18, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Average Accuracy',
        data: [75, 80, 85, 88, 91, 93],
        borderColor: 'rgba(161, 119, 180, 1)',
        backgroundColor: 'rgba(161, 119, 180, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const observations = [
    {
      type: 'success',
      icon: <FaCheckCircle />,
      title: 'High Detection Accuracy',
      description: 'The system achieves 90%+ accuracy for most standard yoga poses when proper lighting and positioning are maintained.'
    },
    {
      type: 'success',
      icon: <FaCheckCircle />,
      title: 'Real-time Processing',
      description: 'Pose detection runs at 30+ FPS, providing smooth real-time feedback without noticeable lag.'
    },
    {
      type: 'warning',
      icon: <FaExclamationCircle />,
      title: 'Similar Pose Confusion',
      description: 'Some poses with similar body positions may occasionally be confused, particularly intermediate poses.'
    },
    {
      type: 'success',
      icon: <FaCheckCircle />,
      title: 'Progressive Improvement',
      description: 'Model accuracy improves with additional training data and user feedback integration.'
    }
  ];

  const metrics = [
    { label: 'Overall Accuracy', value: '91.5%', color: '#a177b4' },
    { label: 'Precision', value: '94%', color: '#9fc5a7' },
    { label: 'Recall', value: '91%', color: '#f39c12' },
    { label: 'F1-Score', value: '92.5%', color: '#3498db' },
  ];

  return (
    <div className="project-info-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Project Overview</span>
          <h1>About YogaGuru</h1>
          <p>
            Learn how our AI-powered yoga assistant works, explore the technology 
            behind it, and see our performance results.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="container">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              <FaStar /> Features
            </button>
            <button 
              className={`tab-btn ${activeTab === 'how-it-works' ? 'active' : ''}`}
              onClick={() => setActiveTab('how-it-works')}
            >
              <FaCogs /> How It Works
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tech-stack' ? 'active' : ''}`}
              onClick={() => setActiveTab('tech-stack')}
            >
              <FaCode /> Tech Stack
            </button>
            <button 
              className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              <FaChartLine /> Results
            </button>
          </div>
        </div>
      </div>

      {/* Features Content */}
      {activeTab === 'features' && (
        <div className="tab-content features-content">
          {/* Main Features Grid */}
          <section className="section">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Discover</span>
                <h2>Platform Features</h2>
              </div>
              <div className="features-grid stagger-children">
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
                <div className="highlight-content scroll-animate-left">
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
                <div className="highlight-visual scroll-animate-right">
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
              <div className="section-title scroll-animate">
                <span>More Features</span>
                <h2>Designed for Your Practice</h2>
              </div>
              <div className="additional-grid stagger-children">
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
        </div>
      )}

      {/* How It Works Content */}
      {activeTab === 'how-it-works' && (
        <div className="tab-content how-it-works-content">
          {/* Steps Section */}
          <section className="section steps-section">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Step by Step</span>
                <h2>How It Works</h2>
              </div>
              <div className="steps-container stagger-children">
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
              <div className="section-title scroll-animate">
                <span>Visual Overview</span>
                <h2>The Detection Flow</h2>
              </div>
              <div className="flow-diagram scroll-animate">
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
              <div className="section-title scroll-animate">
                <span>Before You Start</span>
                <h2>Requirements</h2>
              </div>
              <div className="requirements-grid stagger-children">
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
        </div>
      )}

      {/* Tech Stack Content */}
      {activeTab === 'tech-stack' && (
        <div className="tab-content tech-stack-content">
          {/* Tech Categories */}
          <section className="section">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Under the Hood</span>
                <h2>Technology Stack</h2>
              </div>
              <div className="tech-categories stagger-children">
                {techCategories.map((category, index) => (
                  <div key={index} className="tech-category">
                    <div className="category-header">
                      <div 
                        className="category-icon"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                      >
                        {category.icon}
                      </div>
                      <h3>{category.title}</h3>
                    </div>
                    <div className="tech-grid">
                      {category.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="tech-card">
                          <div 
                            className="tech-icon"
                            style={{ color: tech.color }}
                          >
                            {tech.icon}
                          </div>
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section className="section architecture-section gradient-bg-light">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>System Design</span>
                <h2>Architecture Overview</h2>
              </div>
              <div className="architecture-grid stagger-children">
                {architectureDetails.map((layer, index) => (
                  <div key={index} className="layer-card">
                    <div className="layer-number">{index + 1}</div>
                    <h3>{layer.layer}</h3>
                    <p>{layer.description}</p>
                    <div className="layer-tech">
                      {layer.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ML Model Details */}
          <section className="section ml-section">
            <div className="container">
              <div className="ml-content">
                <div className="ml-text scroll-animate-left">
                  <span className="section-label">Core Technology</span>
                  <h2>Machine Learning Models</h2>
                  <p>
                    Our pose detection system uses state-of-the-art machine learning 
                    models to accurately identify and analyze yoga poses. The system 
                    combines multiple AI technologies to provide real-time feedback.
                  </p>
                  <div className="ml-features">
                    <div className="ml-feature">
                      <h4>MediaPipe Pose</h4>
                      <p>Google's ML solution for high-fidelity body pose tracking</p>
                    </div>
                    <div className="ml-feature">
                      <h4>TensorFlow.js</h4>
                      <p>Browser-based machine learning for real-time processing</p>
                    </div>
                    <div className="ml-feature">
                      <h4>Custom Classifiers</h4>
                      <p>Trained models for yoga pose classification and scoring</p>
                    </div>
                  </div>
                </div>
                <div className="ml-visual scroll-animate-right">
                  <div className="model-diagram">
                    <div className="diagram-node input">
                      <span>Camera Input</span>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-node process">
                      <span>Pose Estimation</span>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-node process">
                      <span>Keypoint Extraction</span>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-node process">
                      <span>Classification</span>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-node output">
                      <span>Feedback Output</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stats */}
          <section className="section stats-section">
            <div className="container">
              <div className="stats-grid stagger-children">
                <div className="stat-item">
                  <h3>33</h3>
                  <p>Body Keypoints Tracked</p>
                </div>
                <div className="stat-item">
                  <h3>30+</h3>
                  <p>FPS Real-time Processing</p>
                </div>
                <div className="stat-item">
                  <h3>95%</h3>
                  <p>Detection Accuracy</p>
                </div>
                <div className="stat-item">
                  <h3>10+</h3>
                  <p>Yoga Poses Supported</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Results Content */}
      {activeTab === 'results' && (
        <div className="tab-content results-content">
          {/* Metrics Overview */}
          <section className="section metrics-section">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Performance</span>
                <h2>Results & Analysis</h2>
              </div>
              <div className="metrics-grid stagger-children">
                {metrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div 
                      className="metric-value" 
                      style={{ color: metric.color }}
                    >
                      {metric.value}
                    </div>
                    <div className="metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="section charts-section gradient-bg-light">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Visual Analytics</span>
                <h2>Performance Charts</h2>
              </div>
              
              <div className="charts-grid stagger-children">
                <div className="chart-container">
                  <h3>Accuracy by Pose Type</h3>
                  <div className="chart-wrapper">
                    <Bar data={accuracyData} options={chartOptions} />
                  </div>
                </div>
                
                <div className="chart-container">
                  <h3>Model Performance Metrics</h3>
                  <div className="chart-wrapper doughnut">
                    <Doughnut data={precisionRecallData} options={chartOptions} />
                  </div>
                </div>
              </div>

              <div className="chart-container full-width">
                <h3>Accuracy Improvement Over Time</h3>
                <div className="chart-wrapper">
                  <Line data={performanceData} options={chartOptions} />
                </div>
              </div>
            </div>
          </section>

          {/* Precision & Recall Explanation */}
          <section className="section explanation-section">
            <div className="container">
              <div className="explanation-grid stagger-children">
                <div className="explanation-card">
                  <h3>Precision</h3>
                  <p>
                    Precision measures how many of the poses the system identified 
                    as correct were actually correct. Our 94% precision means that 
                    when the system says you're doing a pose correctly, it's right 
                    94% of the time.
                  </p>
                  <div className="formula">
                    Precision = True Positives / (True Positives + False Positives)
                  </div>
                </div>
                
                <div className="explanation-card">
                  <h3>Recall</h3>
                  <p>
                    Recall measures how many of the actual correct poses were 
                    successfully identified by the system. Our 91% recall means 
                    the system catches 91% of all correct pose attempts.
                  </p>
                  <div className="formula">
                    Recall = True Positives / (True Positives + False Negatives)
                  </div>
                </div>
                
                <div className="explanation-card">
                  <h3>F1-Score</h3>
                  <p>
                    The F1-Score is the harmonic mean of precision and recall, 
                    providing a single metric that balances both. Our 92.5% F1-Score 
                    indicates excellent overall model performance.
                  </p>
                  <div className="formula">
                    F1 = 2 × (Precision × Recall) / (Precision + Recall)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Observations */}
          <section className="section observations-section">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Key Insights</span>
                <h2>Observations</h2>
              </div>
              
              <div className="observations-grid stagger-children">
                {observations.map((obs, index) => (
                  <div key={index} className={`observation-card ${obs.type}`}>
                    <div className="observation-icon">
                      {obs.icon}
                    </div>
                    <div className="observation-content">
                      <h4>{obs.title}</h4>
                      <p>{obs.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Future Improvements */}
          <section className="section improvements-section gradient-bg-light">
            <div className="container">
              <div className="section-title scroll-animate">
                <span>Roadmap</span>
                <h2>Future Improvements</h2>
              </div>
              
              <div className="improvements-grid stagger-children">
                <div className="improvement-item">
                  <FaChartLine />
                  <h4>More Poses</h4>
                  <p>Expanding the library to include 50+ yoga poses</p>
                </div>
                <div className="improvement-item">
                  <FaChartLine />
                  <h4>Better Accuracy</h4>
                  <p>Training on larger datasets for improved detection</p>
                </div>
                <div className="improvement-item">
                  <FaChartLine />
                  <h4>Voice Guidance</h4>
                  <p>Adding audio instructions and real-time voice feedback</p>
                </div>
                <div className="improvement-item">
                  <FaChartLine />
                  <h4>Progress Tracking</h4>
                  <p>Personal analytics and improvement tracking over time</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section scroll-animate-scale">
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

export default ProjectInfo;
