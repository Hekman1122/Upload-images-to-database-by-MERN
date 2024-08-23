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
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.log("MongoDB connection failed.");
    console.log(err);
  });

//routes
//upload images buffer data to mongodb
app.post("api/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const image = new Image({
    name: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });
  try {
    const result = await image.save();
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

//get image from mongodb
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find({});
    const convertImages = images.map((img) => {
      return {
        name: img.name,
        data: img.data.toString("base64"),
        contentType: img.contentType,
      };
    });
    return res.status(200).send(convertImages);
  } catch (err) {
    return res.status(500).send(err);
  }
});

//listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
