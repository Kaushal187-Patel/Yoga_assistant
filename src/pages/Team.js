import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Keraliya Kaushal',
      role: 'Project Lead',
      department: 'Computer Science',
      image: '/TeamImage/Kaushal.png',
      description: 'Responsible for project management, system architecture, and frontend development.',
      links: {
        github: 'https://github.com/Kaushal187-Patel',
        linkedin: 'https://www.linkedin.com/in/keraliya-kaushal-2bb578273',
        email: 'kaushal151131@email.com'
      }
    },
    {
      name: 'Mankad Drashti',
      role: 'ML Developer',
      department: 'Computer Science',
      image: '/TeamImage/drashti.jpg',
      description: 'Specialized in machine learning model development and pose estimation algorithms.',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'student2@email.com'
      },
    }
  ];


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
