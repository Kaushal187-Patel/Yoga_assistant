const { Pool } = require('pg');

// Database configuration using DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in environment variables!');
}

// The pg library should handle URL-encoded passwords in connection strings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test database connection
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully at', result.rows[0].now);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

module.exports = { pool, testConnection };
