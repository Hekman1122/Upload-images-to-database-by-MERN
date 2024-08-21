const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.get("/api/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
