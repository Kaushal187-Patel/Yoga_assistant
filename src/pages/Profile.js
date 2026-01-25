import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendar, FaSignOutAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.css';

const API_BASE_URL = 'http://localhost:5000/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditedName(userData.name);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const handleUpdateProfile = async () => {
    if (!editedName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: editedName })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Update local storage
      const updatedUser = { ...user, name: editedName };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <h1>My Profile</h1>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button 
                  className="btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button 
                    className="btn-save"
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                  >
                    <FaSave /> {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    className="btn-cancel"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(user.name);
                      setError('');
                    }}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="profile-error">{error}</div>
            )}

            <div className="profile-info">
              <div className="info-item">
                <label>
                  <FaUser /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </div>

              <div className="info-item">
                <label>
                  <FaEnvelope /> Email Address
                </label>
                <span>{user.email}</span>
              </div>

              <div className="info-item">
                <label>
                  <FaCalendar /> Member Since
                </label>
                <span>{formatDate(user.created_at || user.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="btn-logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
