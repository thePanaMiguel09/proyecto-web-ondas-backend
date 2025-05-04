require("dotenv").config();

const express = require("express");

const app = express();

const PORT = 3000;

const connectDB = require("./config/db");
connectDB();


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World from Miguel Angel Chavez");
});

app.listen(PORT, () => {
  console.log(`Server listening at port http://localhost:${PORT}/`);
});
