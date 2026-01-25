const express = require('express');
const router = express.Router();

// Store contact messages (in production, use database)
let contactMessages = [];

// Submit contact form
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create contact message
    const newMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      subject: subject || 'No Subject',
      message,
      createdAt: new Date(),
      status: 'pending'
    };

    contactMessages.push(newMessage);

    res.status(201).json({
      message: 'Thank you for contacting us! We will get back to you soon.',
      id: newMessage.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all messages (admin only - would need authentication in production)
router.get('/', (req, res) => {
  res.json(contactMessages);
});

// Get message by ID
router.get('/:id', (req, res) => {
  const message = contactMessages.find(m => m.id === parseInt(req.params.id));
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  res.json(message);
});

// Update message status
router.patch('/:id', (req, res) => {
  const message = contactMessages.find(m => m.id === parseInt(req.params.id));
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const { status } = req.body;
  if (status) {
    message.status = status;
  }

  res.json({
    message: 'Message updated successfully',
    data: message
  });
});

module.exports = router;
