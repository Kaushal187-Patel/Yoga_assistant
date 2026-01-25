import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose, message, title = 'Success!' }) => {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="success-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="success-modal-icon">
          <FaCheckCircle />
        </div>
        <h2 className="success-modal-title">{title}</h2>
        <p className="success-modal-message">{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
