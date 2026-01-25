import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              YogaGuru
            </Link>
            <p>
              AI-powered yoga pose detection platform helping you practice yoga correctly 
              with real-time feedback and posture correction.
            </p>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Yoga</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pose-detection">Pose Detection</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/tech-stack">Technology</Link></li>
              <li><Link to="/results">Results</Link></li>
              <li><Link to="/team">Our Team</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <span>Email:</span>
                <a href="mailto:contact@yogaguru.com">contact@yogaguru.com</a>
              </li>
              <li>
                <span>Phone:</span>
                <a href="tel:+919265300000">+91 92653 00000</a>
              </li>
              <li>
                <span>Address:</span>
                <p>Your College Name, City, State</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Created with <FaHeart className="heart-icon" /> by YogaGuru Team
          </p>
          <p className="footer-tagline">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
