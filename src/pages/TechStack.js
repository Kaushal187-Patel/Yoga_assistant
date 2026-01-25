import React from 'react';
import { 
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaLaptopCode,
  FaCogs
} from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiOpencv, 
  SiJupyter,
  SiVisualstudiocode 
} from 'react-icons/si';
import './TechStack.css';

const TechStack = () => {
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

  return (
    <div className="tech-stack-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Under the Hood</span>
          <h1>Technology Stack</h1>
          <p>
            Explore the cutting-edge technologies powering YogaGuru's 
            AI-based yoga pose detection platform.
          </p>
        </div>
      </section>

      {/* Tech Categories */}
      <section className="section">
        <div className="container">
          <div className="tech-categories">
            {techCategories.map((category, index) => (
              <div key={index} className="tech-category">
                <div className="category-header">
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <h2>{category.title}</h2>
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
          <div className="section-title">
            <span>System Design</span>
            <h2>Architecture Overview</h2>
          </div>
          <div className="architecture-grid">
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
            <div className="ml-text">
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
            <div className="ml-visual">
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
          <div className="stats-grid">
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
  );
};

export default TechStack;
