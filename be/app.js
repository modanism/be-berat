const express = require("express");
const cors = require("cors");
const beratRoutes = require("./routes/beratRoutes");
const { initDB } = require("./db");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

initDB();

app.use("/", beratRoutes);

app.listen(port, () => console.log(`Server has started on port: ${port}`));
