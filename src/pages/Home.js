import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, 
  FaShieldAlt, 
  FaBrain, 
  FaDumbbell,
  FaCamera,
  FaChartLine,
  FaUserCheck,
  FaLightbulb,
  FaChevronDown
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const benefits = [
    {
      icon: <FaHeartbeat />,
      title: 'Improve Posture',
      description: 'Get real-time feedback to correct your yoga poses and maintain proper alignment.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Reduce Injuries',
      description: 'AI-powered detection helps prevent injuries by identifying incorrect poses early.'
    },
    {
      icon: <FaBrain />,
      title: 'Reduce Stress',
      description: 'Practice yoga with confidence, reducing anxiety and promoting mental wellness.'
    },
    {
      icon: <FaDumbbell />,
      title: 'Increase Strength',
      description: 'Build flexibility and strength with guided yoga practice and proper form.'
    }
  ];

  const insights = [
    {
      category: 'Wellness Tips',
      items: [
        { title: 'Gratitude', text: 'This can help you shift your focus from negative thoughts to positive ones and improve your mental health.' },
        { title: 'Be Consistent', text: 'Practice yoga consistently to see the best results.' },
        { title: 'Practice on Light Stomach', text: 'Practicing yoga on a light stomach helps prevent discomfort and allows for better movement.' }
      ]
    },
    {
      category: 'Science Behind Yoga',
      items: [
        { title: 'Stress Relief', text: 'Reduces cortisol levels for mental peace.' },
        { title: 'Brain Boost', text: 'Enhances focus and memory through blood circulation.' },
        { title: 'Heart Health', text: 'Improves cardiovascular efficiency through relaxation.' }
      ]
    },
    {
      category: 'Yoga Insights',
      items: [
        { title: 'Active Meditation', text: 'A practice that involves being mindful while performing daily activities.' },
        { title: 'Face Yoga', text: 'A series of facial exercises to tone muscles and improve skin health.' },
        { title: 'Chair Yoga', text: 'A gentle practice using a chair for support, ideal for seniors.' }
      ]
    },
    {
      category: 'Myths & Truths',
      items: [
        { title: 'Myth: Yoga is not a workout', text: 'Truth: The physical aspect of yoga was created to exhaust the body and mind.' },
        { title: 'Myth: Yoga is just for women', text: 'Truth: Around 25% to 35% of yoga practitioners are men.' },
        { title: 'Myth: Yoga is purely physical', text: 'Truth: It integrates mind, body, and soul.' }
      ]
    }
  ];

  const yogaPoses = [
    'Tadasana', 'Virabhadrasana II', 'Padmasana', 'Bhujangasana', 'Chakrasana',
    'Dhanurasana', 'Vajrasana', 'Halasana', 'Sarvangasana', 'Garudasana'
  ];

  const faqs = [
    { q: 'Can anyone do yoga?', a: 'Yes! Yoga is suitable for people of all ages and fitness levels. Modifications and beginner-friendly classes are available.' },
    { q: 'How often should I practice yoga?', a: 'Practicing 2-3 times a week is a great start. For maximum benefits, try to incorporate yoga into your daily routine.' },
    { q: 'What is the best time to practice yoga?', a: 'Early morning or evening is ideal, but you can practice anytime that fits your schedule.' },
    { q: 'Do I need special equipment for yoga?', a: 'A yoga mat is essential. Optional props like blocks, straps, and bolsters can provide additional support.' },
    { q: 'Is yoga pose detection suitable for beginners?', a: 'Yes! It can provide real-time feedback to help beginners learn proper form and avoid injuries.' }
  ];

  const [activeInsight, setActiveInsight] = React.useState(0);
  const [activeFaq, setActiveFaq] = React.useState(0);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="bubble-container">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-2"></div>
            <div className="bubble bubble-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="animate-fadeInUp">
              <span>YogaGuru</span>
              <br />
              <span className="hero-subtitle">Your Path To Wellness Starts Here</span>
            </h1>
            <p className="hero-tagline animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              "Balance, Breathe, Strengthen, Thrive"
            </p>
            <div className="hero-buttons animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link to="/pose-detection" className="btn btn-primary">
                Start Pose Detection
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>

          <div className="hero-visual animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="laptop-mockup">
              <div className="laptop-screen">
                <div className="insights-selector">
                  <h3>Insights, Science, and Myths</h3>
                  <div className="insight-cards">
                    {insights.map((insight, index) => (
                      <button
                        key={index}
                        className={`insight-card ${activeInsight === index ? 'active' : ''}`}
                        onClick={() => setActiveInsight(index)}
                      >
                        <span>{insight.category}</span>
                        {index === 0 && <FaLightbulb />}
                        {index === 1 && <FaBrain />}
                        {index === 2 && <FaChartLine />}
                        {index === 3 && <FaUserCheck />}
                      </button>
                    ))}
                  </div>
                  <div className="insight-content">
                    {insights[activeInsight].items.map((item, idx) => (
                      <div key={idx} className="insight-item">
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="yoga-person">
              <svg viewBox="0 0 275 494" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M192.631 259.732C192.717 257.924 193.198 256.157 194.04 254.555C194.883 252.953 196.066 251.556 197.507 250.461C198.949 249.366 200.612 248.6 202.381 248.217C204.15 247.835 205.982 247.845 207.746 248.247L224.118 225.174L240.566 231.704L216.988 263.962C216.117 266.882 214.204 269.381 211.613 270.985C209.023 272.589 205.933 273.187 202.931 272.666C199.929 272.144 197.222 270.54 195.324 268.156C193.425 265.772 192.467 262.775 192.631 259.732L192.631 259.732Z" fill="#A0616A"/>
                <path d="M149.887 449.434H133.701L126 387L149.89 387.001L149.887 449.434Z" fill="#F7D6C3"/>
                <path d="M117.887 445.768H153.872V465.423H103V460.655C103 456.707 104.568 452.92 107.36 450.128C110.152 447.337 113.939 445.768 117.887 445.768Z" fill="#2F2E41"/>
                <path d="M220.784 478.297H204.597L196.897 415.863L220.786 415.864L220.784 478.297Z" fill="#F7D6C3"/>
                <path d="M188.267 473.672H224.252V493.327H173.38V488.558C173.38 484.61 174.949 480.824 177.74 478.032C180.532 475.24 184.319 473.672 188.267 473.672V473.672Z" fill="#2F2E41"/>
                <path d="M226.54 250.407L225.22 342.828L223.9 464.295L194.853 461.654L179.5 294.5L175.5 292L145.5 336L152 432L124.5 427.5L104.5 324.5L139.401 250.407H226.54Z" fill="#2F2E41"/>
                <path d="M136.506 256.252L130 254.5L152.635 142.834L144.219 108.61C143.781 106.83 144.012 104.951 144.868 103.329C145.724 101.707 147.144 100.456 148.861 99.8116L164.003 94.1339L169.352 79.4225L211.558 83.9705L212.596 95.4678C217.17 96.9346 254.833 109.478 252.234 123.77C249.67 137.877 234.525 182.259 233.756 184.508L231.104 248.157L230.778 248.32C230.385 248.516 201.294 262.821 169.689 262.818C158.56 262.818 147.112 261.043 136.506 256.252Z" fill="#3F3D56"/>
                <g className="turning-head">
                  <path d="M215.466 56.3296C223.516 41.603 218.104 23.1388 203.378 15.0885C188.651 7.03825 170.187 12.4505 162.136 27.177C154.086 41.9036 159.498 60.3678 174.225 68.4181C188.952 76.4683 207.416 71.0562 215.466 56.3296Z" fill="#F7D6C3"/>
                  <path d="M213.416 71.1705C207.625 77.3396 196.869 74.0279 196.115 65.6001C196.055 64.9457 196.06 64.2872 196.127 63.6337C196.517 59.9006 198.674 56.5113 198.157 52.5696C198.04 51.5886 197.675 50.6537 197.095 49.8535C192.48 43.6736 181.647 52.6176 177.292 47.0232C174.621 43.5928 177.76 38.1918 175.711 34.3577C173.006 29.2974 164.994 31.7937 159.97 29.0224C154.38 25.939 154.714 17.3622 158.394 12.1453C162.881 5.78305 170.75 2.38819 178.52 1.89892C186.29 1.40965 194.007 3.51014 201.261 6.33722C209.504 9.54935 217.677 13.9885 222.749 21.2361C228.918 30.0498 229.511 41.899 226.426 52.205C224.55 58.4743 218.145 66.1328 213.416 71.1705Z" fill="#2F2E41"/>
                </g>
                <g className="waving-arm">
                  <path d="M12.4471 106.262C14.1354 105.61 15.9462 105.336 17.7519 105.459C19.5576 105.582 21.3144 106.099 22.8985 106.975C24.4826 107.85 25.8554 109.063 26.9203 110.526C27.9852 111.99 28.7163 113.669 29.0621 115.445L56.7836 121.095L57.4593 138.778L18.4233 130.251C15.4002 130.634 12.3417 129.894 9.8272 128.173C7.31275 126.452 5.51707 123.868 4.78044 120.911C4.0438 117.954 4.41739 114.83 5.83041 112.13C7.24343 109.43 9.5977 107.342 12.4471 106.262Z" fill="#F7D6C3"/>
                  <path d="M42.7306 117.07L104.711 120.57L151 100.5L172 123L164 134.5L104.711 149.783L34.7306 135.787L42.7306 117.07Z" fill="#3F3D56"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Yoga Poses Marquee */}
      <section className="yoga-marquee">
        <div className="marquee-track">
          <div className="marquee-content">
            {yogaPoses.map((pose, index) => (
              <div key={index} className="pose-item">
                <span className="pose-name">{pose}</span>
              </div>
            ))}
            {yogaPoses.map((pose, index) => (
              <div key={`dup-${index}`} className="pose-item">
                <span className="pose-name">{pose}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-home gradient-bg-light">
        <div className="container">
          <div className="about-grid">
            <div className="about-image scroll-animate-left">
              <img 
                src="https://i.pinimg.com/originals/56/42/db/5642dbe39105d8cfd0d90fc5be597eb8.jpg" 
                alt="Yoga Practice" 
              />
            </div>
            <div className="about-content scroll-animate-right">
              <span>About Us</span>
              <h2>YogaGuru</h2>
              <p>
                At YogaGuru, our mission is to integrate technology with wellness, empowering 
                people to enhance their yoga practice through personalized, data-driven insights. 
                We aim to make yoga accessible and effective for everyone, ensuring correct 
                posture and alignment in every session.
              </p>
              <p>
                We specialize in AI-powered yoga pose detection to provide real-time feedback 
                to users on their yoga practice. Our platform helps users achieve accurate poses, 
                avoid injuries, and deepen their yoga journey through technology-driven solutions.
              </p>
              <Link to="/about" className="btn btn-primary">
                Learn More About Yoga
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits">
        <div className="container">
          <div className="section-title scroll-animate">
            <span>Why Choose YogaGuru</span>
            <h2>Benefits of AI-Powered Yoga</h2>
          </div>
          <div className="benefits-grid stagger-children">
            {benefits.map((benefit, index) => (
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

      {/* CTA Section */}
      <section className="cta-section scroll-animate-scale">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Start Your Yoga Journey?</h2>
              <p>Experience AI-powered pose detection and get real-time feedback on your practice.</p>
            </div>
            <div className="cta-buttons">
              <Link to="/pose-detection" className="btn btn-primary">
                <FaCamera /> Start Pose Detection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-title scroll-animate">
            <span>Common Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="accordion scroll-animate">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`accordion-item ${activeFaq === index ? 'active' : ''}`}
              >
                <div 
                  className="accordion-header"
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                >
                  <span>{faq.q}</span>
                  <FaChevronDown className="icon" />
                </div>
                <div className="accordion-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section scroll-animate-scale">
        <div className="container">
          <blockquote>
            "Yoga for Every Body, Every Journey."
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default Home;
