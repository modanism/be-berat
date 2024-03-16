const { pool } = require("../db");

const getAllBerat = async () => {
  return await pool.query("SELECT * FROM berat");
};

const getDetailBerat = async (id) => {
  return await pool.query("SELECT * FROM berat WHERE id = $1");
};

const insertBerat = async (tanggal, max, min) => {
  const insertQuery = `
        INSERT INTO berat (tanggal, Max, Min)
        VALUES ($1, $2, $3)
    `;
  return await pool.query(insertQuery, [tanggal, max, min]);
};

const updateBerat = async (id, max, min) => {
  const updateQuery = `
        UPDATE berat
        SET Max = $1, Min = $2
        WHERE id = $3
    `;
  return await pool.query(updateQuery, [max, min, id]);
};

const deleteBerat = async (id) => {
  const deleteQuery = `
        DELETE FROM berat
        WHERE id = $1
    `;
  return await pool.query(deleteQuery, [id]);
};

module.exports = {
  getAllBerat,
  getDetailBerat,
  insertBerat,
  updateBerat,
  deleteBerat,
};
