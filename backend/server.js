const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: '69723',
  password: '69723',
  database: 'wathareDB'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Function to format timestamp to 24-hour time format with date
function formatTimestampTo24HourWithDate(ts) {
  const date = new Date(ts);
  const dateString = date.toISOString().split('T')[0];
  const timeString = date.toLocaleTimeString('en-US', { hour12: false });
  return `${dateString} ${timeString}`;
}

// API endpoint to fetch all data
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM sample_data', (error, results, fields) => {
    if (error) throw error;
    const filteredResults = results.map(result => ({
      id: result.id,
      ts: formatTimestampTo24HourWithDate(result.ts),
      machine_status: result.machine_status,
      vibration: result.vibration
    }));
    res.json(filteredResults);
  });
});

// API endpoint to fetch data based on time range
app.get('/data/time-range', (req, res) => {
  const { startTime, endTime } = req.query;

  connection.query('SELECT * FROM sample_data WHERE ts >= ? AND ts <= ?', [startTime, endTime], (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    const filteredResults = results.map(result => ({
      id: result.id,
      ts: formatTimestampTo24HourWithDate(result.ts),
      machine_status: result.machine_status,
      vibration: result.vibration
    }));
    res.json(filteredResults);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
