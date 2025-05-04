const cors = require("cors")

const dotenv = require("dotenv");

dotenv.config();

const express = require("express");

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}))

const PORT = 3000;

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({"name":"Miguel",
    "lastName": "Chavez"
  })
});

app.listen(PORT, () => {
  console.log(`Server listening at port http://localhost:${PORT}/`);
});
