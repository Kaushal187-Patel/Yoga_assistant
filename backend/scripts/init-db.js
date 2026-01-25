const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDatabase() {
  try {
    console.log('Reading schema file...');
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema...');
    
    // Remove comments and empty lines
    let cleanSchema = schema
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 0 && !trimmed.startsWith('--') && !trimmed.toLowerCase().startsWith('connect');
      })
      .join('\n');

    // Execute the entire schema as one query (PostgreSQL supports this)
    try {
      await pool.query(cleanSchema);
      console.log('✓ Database schema created successfully!');
    } catch (error) {
      // If that fails, try executing statement by statement
      console.log('Trying statement-by-statement execution...');
      const statements = cleanSchema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const statement of statements) {
        if (statement.length > 0) {
          try {
            await pool.query(statement + ';');
          } catch (err) {
            // Ignore "already exists" errors
            if (err.code !== '42P07' && 
                err.code !== '42710' && 
                err.code !== '42P16' &&
                !err.message.includes('already exists') &&
                !err.message.includes('duplicate')) {
              console.error('Error:', err.message);
              console.error('Statement:', statement.substring(0, 150));
            }
          }
        }
      }
    }

    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
