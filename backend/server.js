const express = require('express');
const cors = require('cors');
const sqlite3 = require('better-sqlite3');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3('groceries.db');

// run this line if empty table is necessary <---------
// db.prepare('DROP TABLE IF EXISTS groceries').run(); 

db.prepare(`
  CREATE TABLE IF NOT EXISTS groceries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,
    bought BOOLEAN NOT NULL DEFAULT 0
  )
`).run();

app.get('/groceries', (req, res) => {
  const items = db.prepare('SELECT * FROM groceries').all();
  res.json(items);
});

app.post('/groceries', (req, res) => {
  const { title, amount, bought = false } = req.body;
  const stmt = db.prepare('INSERT INTO groceries (title, amount, bought) VALUES (?, ?, ?)');
  const info = stmt.run(title, amount, bought ? 1 : 0);
  const newItem = db.prepare('SELECT * FROM groceries WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newItem);
});

app.put('/groceries/:id', (req, res) => {
  const { id } = req.params;
  const { title, amount, bought } = req.body;
  const stmt = db.prepare(`
    UPDATE groceries 
    SET title = ?, amount = ?, bought = ? 
    WHERE id = ?
  `);
  const result = stmt.run(title, amount, bought ? 1 : 0, id);
  if (result.changes) {
    const updatedItem = db.prepare('SELECT * FROM groceries WHERE id = ?').get(id);
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/groceries/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM groceries WHERE id = ?');
  stmt.run(id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
