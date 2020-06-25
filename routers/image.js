const { Router } = require("express");
const Image = require("../models").image;

//instantiate:
const router = new Router();

// async function findAllImages() {
//   try {
//     const allImages = await Image.findAll();
//     return allImages.map((i) => i.get({ plain: true }));
//   } catch (error) {
//     console.log(error);
//   }
// }

router.get("/", async (req, res, next) => {
  console.log("Got to images!");
  //res.send("Hello from images!!");
  //try {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;

  const allImages = await Image.findAll({ limit, offset });
  res.json({ allImages });
  // } catch (e) {
  //  next(e);
  // }
});

router.post("/", async (req, res, next) => {
  try {
    const title = req.body.title;
    const url = req.body.url;
    if (!title || !url) {
      res.status(400).send("Must provide a title and url");
    } else {
      const newImage = await Image.create({ title, url });
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
