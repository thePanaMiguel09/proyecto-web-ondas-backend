const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from Miguel Angel");
});

app.listen(PORT, () => {
  console.log(`Server listening at port http://localhost:${PORT}/`);
});
