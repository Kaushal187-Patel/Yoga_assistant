import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/project-info', label: 'Project Info' },
    { path: '/pose-detection', label: 'Pose Detection' },
    { path: '/team', label: 'Team' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="/yogaguru-icon-final.svg" 
            alt="YogaGuru Logo" 
            className="logo-icon"
          />
          <span className="logo-text">YogaGuru</span>
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {/* Close button for mobile menu */}
          <button 
            className="navbar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <FaTimes />
          </button>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Login/Profile in mobile menu */}
            <li className="mobile-auth-link">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="mobile-profile-link">
                    <FaUser /> {user?.name || 'Profile'}
                  </Link>
                  <button
                    className="mobile-logout-btn"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setIsLoggedIn(false);
                      setUser(null);
                      navigate('/');
                      window.location.reload();
                    }}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="mobile-login-link">
                  <FaUser /> Login
                </Link>
              )}
            </li>
          </ul>

          <div className="navbar-mobile-footer">
            <div className="mobile-contact">
              <p>Contact for more information</p>
              <a href="tel:+919265300000">+91 92653***</a>
            </div>
            <div className="mobile-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://wa.me/919265300000" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="btn btn-profile">
                <FaUser /> {user?.name || 'Profile'}
              </Link>
              <button
                className="btn btn-logout-nav"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  setIsLoggedIn(false);
                  setUser(null);
                  navigate('/');
                  window.location.reload();
                }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          )}
          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
