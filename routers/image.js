const { Router } = require("express");
const Image = require("../models").image;

//instantiate:
const router = new Router();
const toData = require("../auth/jwt").toData;

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
  try {
    const limit = req.query.limit || 25;
    const offset = req.query.offset || 0;

    const allImages = await Image.findAll({ limit, offset });
    res.json({ allImages });
  } catch (e) {
    next(e);
  }
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

router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }

    const allImages = await Image.findAll();
    res.json({ allImages });
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

module.exports = router;
