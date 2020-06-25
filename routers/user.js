const { Router } = require("express");
const User = require("../models").user;

//instantiate:
const router = new Router();

router.get("/", async (req, res) => {
  res.send("Hello from users!!");
  //   try {
  //     const allUsers = await User.findAll();
  //     res.send(allUsers);
  //   } catch (e) {
  //     next(e);
  //   }
});

router.post("/", async (req, res, next) => {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    if (!fullName || !email || !password) {
      res.status(400).send("Must provide all required data!");
    } else {
      const newUser = await User.create({ fullName, email, password });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
