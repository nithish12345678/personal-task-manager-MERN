const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv'); 
dotenv.config();

const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
    process.exit(1); // Terminate the process if unable to connect
  } else {
    console.log('Connected to MySQL');
  }
});

// Create database and table
db.query('CREATE DATABASE IF NOT EXISTS task_manager', (err) => {
  if (err) {
    console.error('Error creating database:', err);
    process.exit(1); 
  }
  db.query(
    'CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT)',
    (err) => {
      if (err) {
        console.error('Error creating table:', err);
        process.exit(1); 
      }
      console.log('Database and table created');
    }
  );
});

// RESTful API Endpoints
app.get('/', (req, res) => {
  res.send('API endpoints are working fine');
});

app.get('/tasks', (req, res) => {
  console.log('get tasks');
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/tasks', (req, res) => {
  console.log('create new task');
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required for creating a task.' });
  } else {
    db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err) => {
      if (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(201);
      }
    });
  }
});

app.put('/tasks/:id', (req, res) => {
  console.log('update task');
  const { title, description } = req.body;
  const taskId = req.params.id;
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required for updating a task.' });
  } else {
    db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, taskId], (err) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(200);
      }
    });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  console.error(' taskId:', taskId);

  if (taskId) {
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
      if (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid Task ID. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
