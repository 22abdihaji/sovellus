const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Luo tietokanta
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Tietokantavirhe:", err.message);
  } else {
    console.log("Yhteys SQLite-tietokantaan onnistui.");
    db.run(`
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                quantity INTEGER
            )
        `);
  }
});

// CRUD-reitit

// 1. Lisää tietoa tietokantaan (CREATE)
app.post("/items", (req, res) => {
  const { name, description, quantity } = req.body;
  db.run(
    `INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)`,
    [name, description, quantity],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// 2. Hae kaikki tiedot tietokannasta (READ)
app.get("/items", (req, res) => {
  db.all(`SELECT * FROM items`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// 3. Poista tietue tietokannasta (DELETE)
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM items WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Tietue poistettu", changes: this.changes });
    }
  });
});
app.get("/", (req, res) => {
  res.send("Palvelin toimii!");
});

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
