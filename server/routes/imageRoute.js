const router = require("express").Router();
const Image = require("../lib/imageSchema");
const multer = require("multer");
const storage = multer.memoryStorage({});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
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
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({});
    const convertImages = images.map((img) => {
      return {
        name: img.name,
        data: img.data.toString("base64"),
        contentType: img.contentType,
      };
    });
    return res.status(200).json(convertImages);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
