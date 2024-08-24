const express = require("express");
const db = require("./lib/db");
const imageRoute = require("./routes/imageRoute");
//express init
const app = express();
const port = process.env.PORT || 3050;
const cors = require("cors");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//db connection
db()
  .then((res) => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.log("MongoDB connection failed.");
    console.log(err);
  });

//routes
app.use("/api", imageRoute);

//listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
