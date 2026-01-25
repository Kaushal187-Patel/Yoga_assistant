import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Student Name 1',
      role: 'Project Lead',
      department: 'Computer Science',
      image: 'https://ui-avatars.com/api/?name=Student+1&background=a177b4&color=fff&size=200',
      description: 'Responsible for project management, system architecture, and frontend development.',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'student1@email.com'
      }
    },
    {
      name: 'Student Name 2',
      role: 'ML Developer',
      department: 'Computer Science',
      image: 'https://ui-avatars.com/api/?name=Student+2&background=9fc5a7&color=fff&size=200',
      description: 'Specialized in machine learning model development and pose estimation algorithms.',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'student2@email.com'
      }
    },
    {
      name: 'Student Name 3',
      role: 'Backend Developer',
      department: 'Computer Science',
      image: 'https://ui-avatars.com/api/?name=Student+3&background=f39c12&color=fff&size=200',
      description: 'Handles server-side development, API design, and database management.',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'student3@email.com'
      }
    },
    {
      name: 'Student Name 4',
      role: 'UI/UX Designer',
      department: 'Computer Science',
      image: 'https://ui-avatars.com/api/?name=Student+4&background=3498db&color=fff&size=200',
      description: 'Creates user interfaces and ensures excellent user experience across the platform.',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'student4@email.com'
      }
    }
  ];

  const guide = {
    name: 'Professor Name',
    role: 'Project Guide',
    department: 'Department of Computer Science',
    image: 'https://ui-avatars.com/api/?name=Professor&background=232323&color=fff&size=200',
    description: 'Providing guidance and mentorship throughout the project development lifecycle.',
    links: {
      linkedin: 'https://linkedin.com',
      email: 'professor@college.edu'
    }
  };

  const collegeInfo = {
    name: 'Your College Name',
    department: 'Department of Computer Science',
    address: 'College Address, City, State - PIN',
    year: '2024-2025'
  };

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Meet Our</span>
          <h1>Development Team</h1>
          <p>
            The talented individuals behind the YogaGuru AI-powered 
            yoga pose detection platform.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="section team-section">
        <div className="container">
          <div className="section-title">
            <span>Students</span>
            <h2>Our Team</h2>
          </div>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <span className="department">{member.department}</span>
                  <p>{member.description}</p>
                  <div className="member-links">
                    {member.links.github && (
                      <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.links.email && (
                      <a href={`mailto:${member.links.email}`}>
                        <FaEnvelope />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="section guide-section gradient-bg-light">
        <div className="container">
          <div className="section-title">
            <span>Mentor</span>
            <h2>Project Guide</h2>
          </div>
          
          <div className="guide-card">
            <div className="guide-image">
              <img src={guide.image} alt={guide.name} />
            </div>
            <div className="guide-info">
              <h3>{guide.name}</h3>
              <span className="role">{guide.role}</span>
              <span className="department">{guide.department}</span>
              <p>{guide.description}</p>
              <div className="guide-links">
                {guide.links.linkedin && (
                  <a href={guide.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {guide.links.email && (
                  <a href={`mailto:${guide.links.email}`} className="btn btn-primary">
                    <FaEnvelope /> Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Info */}
      <section className="section college-section">
        <div className="container">
          <div className="college-card">
            <h2>{collegeInfo.name}</h2>
            <p className="department">{collegeInfo.department}</p>
            <p className="address">{collegeInfo.address}</p>
            <p className="year">Academic Year: {collegeInfo.year}</p>
          </div>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="section acknowledgments-section gradient-bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Acknowledgments</h2>
          </div>
          <div className="acknowledgment-content">
            <p>
              We extend our sincere gratitude to our project guide for their invaluable 
              guidance and support throughout the development of this project. We also 
              thank our college and department for providing the necessary resources and 
              infrastructure to bring this project to fruition.
            </p>
            <p>
              Special thanks to the open-source community for their contributions to 
              TensorFlow, MediaPipe, and other technologies that made this project possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
