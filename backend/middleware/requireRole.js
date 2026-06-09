const { pool } = require('../config/database');

const requireRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const result = await pool.query(
        'SELECT role FROM users WHERE id = $1',
        [req.userId]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }

      const userRole = result.rows[0].role;
      if (userRole !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      }

      req.userRole = userRole;
      next();
    } catch (error) {
      console.error('Role authorization error:', error);
      res.status(500).json({ error: 'Authorization check failed' });
    }
  };
};

module.exports = requireRole;
