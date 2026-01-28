import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaLeaf, 
  FaBalanceScale, 
  FaBrain,
  FaExclamationTriangle,
  FaRobot,
  FaCheckCircle
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const yogaBenefits = [
    {
      icon: <FaHeart />,
      title: 'Physical Health',
      description: 'Improves flexibility, strength, and cardiovascular health through regular practice.'
    },
    {
      icon: <FaLeaf />,
      title: 'Mental Wellness',
      description: 'Reduces stress, anxiety, and promotes mental clarity through mindful breathing.'
    },
    {
      icon: <FaBalanceScale />,
      title: 'Balance & Harmony',
      description: 'Creates balance between body, mind, and spirit for holistic well-being.'
    },
    {
      icon: <FaBrain />,
      title: 'Cognitive Benefits',
      description: 'Enhances focus, memory, and cognitive function through meditation practices.'
    }
  ];

  const incorrectPostureProblems = [
    'Muscle strain and chronic pain',
    'Joint injuries and inflammation',
    'Reduced flexibility over time',
    'Poor breathing patterns',
    'Decreased benefits from practice',
    'Long-term spinal issues'
  ];

  const aiHelps = [
    'Real-time pose detection and correction',
    'Personalized feedback based on your body',
    'Tracking progress over time',
    'Preventing injuries before they happen',
    'Making yoga accessible to beginners',
    'Providing consistent guidance 24/7'
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Learn About</span>
          <h1>What is Yoga?</h1>
          <p>
            Discover the ancient practice that has transformed millions of lives 
            and how AI technology can enhance your yoga journey.
          </p>
        </div>
      </section>

      {/* What is Yoga */}
      <section className="section">
        <div className="container">
          <div className="content-grid">
            <div className="content-image scroll-animate-left">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600" 
                alt="Yoga Practice"
              />
            </div>
            <div className="content-text scroll-animate-right">
              <h2>The Art of Yoga</h2>
              <p>
                Yoga is an ancient practice that originated in India over 5,000 years ago. 
                It encompasses physical postures (asanas), breathing techniques (pranayama), 
                and meditation (dhyana) to achieve harmony between body, mind, and spirit.
              </p>
              <p>
                The word "Yoga" comes from the Sanskrit word "Yuj," meaning to unite or join. 
                It represents the union of individual consciousness with universal consciousness, 
                leading to a state of complete harmony and inner peace.
              </p>
              <p>
                Today, yoga has evolved into various styles including Hatha, Vinyasa, Ashtanga, 
                Bikram, and many more, each offering unique benefits and approaches to this 
                transformative practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Yoga */}
      <section className="section benefits-section gradient-bg-light">
        <div className="container">
          <div className="section-title scroll-animate">
            <span>Why Practice Yoga</span>
            <h2>Benefits of Regular Practice</h2>
          </div>
          <div className="benefits-grid stagger-children">
            {yogaBenefits.map((benefit, index) => (
              <div key={index} className="benefit-card card">
                <div className="icon-box">
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance of Correct Posture */}
      <section className="section">
        <div className="container">
          <div className="content-grid reverse">
            <div className="content-text scroll-animate-left">
              <h2>Importance of Correct Posture</h2>
              <p>
                Proper alignment in yoga poses is crucial for maximizing benefits and 
                preventing injuries. When poses are performed correctly, energy flows 
                freely through the body, muscles are engaged appropriately, and the 
                practice becomes both safe and effective.
              </p>
              <p>
                Correct posture ensures that you're targeting the right muscle groups, 
                maintaining proper breathing patterns, and building strength in a 
                balanced way. It's the foundation of a sustainable yoga practice.
              </p>
              <div className="highlight-box">
                <FaCheckCircle />
                <span>Proper alignment can increase the effectiveness of your practice by up to 40%</span>
              </div>
            </div>
            <div className="content-image scroll-animate-right">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600" 
                alt="Correct Yoga Posture"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problems with Incorrect Practice */}
      <section className="section problems-section">
        <div className="container">
          <div className="section-title scroll-animate">
            <span>Understanding the Risks</span>
            <h2>Problems with Incorrect Yoga Practice</h2>
          </div>
          <div className="problems-content scroll-animate">
            <div className="problems-image">
              <FaExclamationTriangle className="warning-icon" />
            </div>
            <div className="problems-list">
              <p>
                Practicing yoga with incorrect form can lead to various issues 
                that may hinder your progress and cause long-term damage:
              </p>
              <ul>
                {incorrectPostureProblems.map((problem, index) => (
                  <li key={index}>
                    <span className="bullet"></span>
                    {problem}
                  </li>
                ))}
              </ul>
              <p className="note">
                This is why proper guidance and feedback are essential, especially 
                for beginners who are still learning the correct forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Helps */}
      <section className="section ai-section gradient-bg-light">
        <div className="container">
          <div className="content-grid">
            <div className="content-text scroll-animate-left">
              <span className="section-label">Technology Meets Tradition</span>
              <h2>How AI Helps in Yoga Training</h2>
              <p>
                Artificial Intelligence has revolutionized how we approach yoga practice. 
                By using computer vision and machine learning, AI can analyze your poses 
                in real-time and provide instant feedback, just like having a personal 
                yoga instructor available 24/7.
              </p>
              <ul className="ai-benefits-list">
                {aiHelps.map((help, index) => (
                  <li key={index}>
                    <FaRobot />
                    <span>{help}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="content-visual scroll-animate-right">
              <div className="ai-visual-card">
                <div className="ai-icon">
                  <FaRobot />
                </div>
                <h3>AI-Powered Detection</h3>
                <p>
                  Our system uses advanced pose estimation algorithms to detect 
                  33 body keypoints and analyze your posture with 95%+ accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section scroll-animate-scale">
        <div className="container">
          <h2>Ready to Transform Your Practice?</h2>
          <p>Start your AI-guided yoga journey today and experience the difference.</p>
          <div className="cta-buttons">
            <Link to="/pose-detection" className="btn btn-primary">
              Try Pose Detection
            </Link>
            <Link to="/project-info" className="btn btn-outline">
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
