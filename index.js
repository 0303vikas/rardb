const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to the SQLite database
const db = new sqlite3.Database('./db/rarbg_db.sqlite', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
app.get('/', (req,res) => {
  res.render('frontPage')
})

app.get('/filter', (req, res) => {
  const userInput = req.query.search; 
  console.log(userInput?.toString().toLowerCase())

  const query = `SELECT * FROM items WHERE LOWER(items.title) LIKE '%${userInput}%' LIMIT 0,100`; 

  db.all(query,(err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching the data.' });
    } else {
      console.log(rows)
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

// WHERE title LIKE '%${userInput}' || '%${userInput}%' || '${userInput}%'




