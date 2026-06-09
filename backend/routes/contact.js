const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { pool } = require('../config/database');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
const ALLOWED_MESSAGE_STATUSES = new Set(['pending', 'read', 'replied', 'archived']);

const escapeHtml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const sanitizeText = (value, maxLength = 1000) => {
  return String(value || '').trim().slice(0, maxLength);
};

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const sanitizedName = sanitizeText(name, 100);
    const sanitizedEmail = sanitizeText(email, 255).toLowerCase();
    const sanitizedSubject = sanitizeText(subject || 'No Subject', 255);
    const sanitizedMessage = sanitizeText(message, 5000);

    // Validation
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    let savedMessage = { id: Date.now() }; // Default ID if DB fails
    let dbSuccess = false;

    // Try to save to database (but don't fail if DB is not available)
    try {
      const result = await pool.query(
        `INSERT INTO contact_messages (name, email, subject, message, status, created_at) 
         VALUES ($1, $2, $3, $4, 'pending', CURRENT_TIMESTAMP) 
         RETURNING id, created_at`,
        [sanitizedName, sanitizedEmail, sanitizedSubject, sanitizedMessage]
      );
      savedMessage = result.rows[0];
      dbSuccess = true;
    } catch (dbError) {
      console.error('Database save failed (continuing with email):', dbError.message);
    }

    // Send email notification
    let emailSuccess = false;
    try {
      const transporter = createTransporter();
      
      // Email to admin (you)
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${sanitizedSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #a177b4 0%, #9fc5a7 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">YogaGuru Contact Form</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; border-bottom: 2px solid #a177b4; padding-bottom: 10px;">New Message Received</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 5px 0;"><strong style="color: #a177b4;">From:</strong> ${escapeHtml(sanitizedName)}</p>
                <p style="margin: 5px 0;"><strong style="color: #a177b4;">Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
                <p style="margin: 5px 0;"><strong style="color: #a177b4;">Subject:</strong> ${escapeHtml(sanitizedSubject)}</p>
                <p style="margin: 5px 0;"><strong style="color: #a177b4;">Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #a177b4;">
                <h3 style="color: #333; margin-top: 0;">Message:</h3>
                <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(sanitizedMessage)}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 8px;">
                <p style="margin: 0; color: #2e7d32;">
                  <strong>Message ID:</strong> #${savedMessage.id}<br>
                  <strong>Reply to:</strong> <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #a177b4;">${escapeHtml(sanitizedEmail)}</a>
                </p>
              </div>
            </div>
            <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
              This email was sent from YogaGuru Contact Form
            </p>
          </div>
        `
      };

      // Auto-reply to sender
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: sanitizedEmail,
        subject: 'Thank you for contacting YogaGuru!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #a177b4 0%, #9fc5a7 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">YogaGuru</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333;">Hello ${escapeHtml(sanitizedName)}!</h2>
              
              <p style="color: #555; line-height: 1.6;">
                Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #a177b4;">
                <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
                <p style="color: #888;"><strong>Subject:</strong> ${escapeHtml(sanitizedSubject)}</p>
                <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(sanitizedMessage)}</p>
              </div>
              
              <p style="color: #555; line-height: 1.6;">
                In the meantime, feel free to explore our AI-powered yoga pose detection platform at <a href="https://yogaguru.onrender.com" style="color: #a177b4;">YogaGuru</a>.
              </p>
              
              <p style="color: #555;">
                Best regards,<br>
                <strong style="color: #a177b4;">The YogaGuru Team</strong>
              </p>
            </div>
            <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        `
      };

      // Send emails
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && ADMIN_EMAIL) {
        await transporter.sendMail(adminMailOptions);
        console.log('Admin notification email sent successfully');
        
        await transporter.sendMail(userMailOptions);
        console.log('User confirmation email sent successfully');
        
        emailSuccess = true;
      } else {
        console.log('Email credentials/admin destination not configured. Skipping email notifications.');
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError.message);
    }

    // Log message details for debugging
    console.log('Contact form submission:', {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      dbSuccess,
      emailSuccess,
    });

    // Always return success - message was received
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      id: savedMessage.id,
      stored: dbSuccess,
      emailed: emailSuccess
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit message. Please try again.' });
  }
});

// Get all messages (admin only)
router.get('/', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get message by ID
router.get('/:id', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// Update message status
router.patch('/:id', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const { status, admin_notes } = req.body;
    const sanitizedNotes = sanitizeText(admin_notes, 2000);

    if (status && !ALLOWED_MESSAGE_STATUSES.has(status)) {
      return res.status(400).json({ error: 'Invalid message status' });
    }
    
    const result = await pool.query(
      `UPDATE contact_messages 
       SET status = COALESCE($1, status), 
           admin_notes = COALESCE($2, admin_notes),
           replied_at = CASE WHEN $1 = 'replied' THEN CURRENT_TIMESTAMP ELSE replied_at END
       WHERE id = $3
       RETURNING *`,
      [status, sanitizedNotes, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({
      message: 'Message updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

module.exports = router;
