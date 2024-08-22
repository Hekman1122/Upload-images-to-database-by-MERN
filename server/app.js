const express = require("express");
const multer = require("multer");
const db = require("./lib/db");
const Image = require("./lib/imageSchema");

//express init
const app = express();
const port = process.env.PORT || 3050;

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//multer
const storage = multer.memoryStorage({});
const upload = multer({ storage: storage });

//db connection
db()
  .then((res) => {
    console.log(res);
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.log("MongoDB connection failed.");
    console.log(err);
  });

//listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
