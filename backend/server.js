const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Luo SQLite-tietokanta
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

// ➤ **TÄMÄ LISÄTÄÄN**
app.get("/", (req, res) => {
  res.send("Palvelin toimii!");
});

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
