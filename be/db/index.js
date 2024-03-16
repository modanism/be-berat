const { Pool } = require("pg");
const pool = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

const initDB = async () => {
  try {
    const createTableQuery = `
                  CREATE TABLE IF NOT EXISTS berat (
                      id SERIAL PRIMARY KEY,
                      tanggal TIMESTAMP,
                      Max INTEGER,
                      Min INTEGER,
                      Perbedaan INTEGER GENERATED ALWAYS AS (Max - Min) STORED
                  )
              `;
    await pool.query(createTableQuery);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {initDB, pool};
