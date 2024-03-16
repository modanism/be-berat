const express = require("express");
const cors = require('cors');
const {pool,initDB} = require("./db");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

initDB();

//routes
app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM berat");
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  const { tanggal, max, min } = req.body;
  try {
    const insertQuery = `
            INSERT INTO berat (tanggal, Max, Min)
            VALUES ($1, $2, $3)
        `;
    await pool.query(insertQuery, [tanggal, max, min]);
    res
      .status(200)
      .send({ message: "Successfully added data to 'berat' table" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/berat/:id", async (req, res) => {
  const { id } = req.params;
  const { max, min } = req.body;

  try {
    const updateQuery = `
            UPDATE berat
            SET Max = $1, Min = $2
            WHERE id = $3
        `;
    await pool.query(updateQuery, [max, min, id]);
    res.status(200).send({ message: "Successfully updated the row" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/berat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = `
            DELETE FROM berat
            WHERE id = $1
        `;
    await pool.query(deleteQuery, [id]);
    res.status(200).send({ message: "Successfully deleted the row" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
