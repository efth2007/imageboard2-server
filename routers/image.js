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

router.get("/", async (req, res) => {
  res.send("Hello from images!!");
  //   try {
  //     const allImages = await Image.findAll();
  //     res.send(allImages);
  //   } catch (e) {
  //     next(e);
  //   }
  // });
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
