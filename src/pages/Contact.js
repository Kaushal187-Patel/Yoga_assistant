import { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaExclamationCircle } from 'react-icons/fa';
import API_BASE_URL from '../config/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: 'kaushal151131@gmail.com',
      link: 'mailto:kaushal151131@gmail.com'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: '+91 92653 27760',
      link: 'tel:+919265327760'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      details: 'Gandhinagar, Gujarat, India - 382016',
      link: null
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>
            Have questions about YogaGuru? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper scroll-animate-left">
              <h2>Send us a Message</h2>

              {error && (
                <div className="error-message">
                  <FaExclamationCircle />
                  <p>{error}</p>
                </div>
              )}

              {isSubmitted ? (
                <div className="success-message">
                  <FaCheckCircle />
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="5"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper scroll-animate-right">
              <h2>Contact Information</h2>
              <p>
                Reach out to us through any of the following channels.
                We're here to help with any questions about our AI yoga
                pose detection platform.
              </p>

              <div className="contact-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-icon">
                      {info.icon}
                    </div>
                    <div className="contact-details">
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link}>{info.details}</a>
                      ) : (
                        <p>{info.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map - Gandhinagar */}
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117494.12456741498!2d72.5797661!3d23.2156354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2adec1f16d8d%3A0xdc447b8706689bc3!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1706435678901!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gandhinagar Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="section faq-cta gradient-bg-light scroll-animate-scale">
        <div className="container text-center">
          <h2>Frequently Asked Questions</h2>
          <p>
            Check out our FAQ section for quick answers to common questions.
          </p>
          <a href="/#faq" className="btn btn-primary">
            View FAQs
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
