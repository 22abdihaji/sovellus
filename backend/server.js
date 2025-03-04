const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("❌ SQLite Connection Error:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});
