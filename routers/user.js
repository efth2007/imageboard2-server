const { Router } = require("express");
const User = require("../models").user;
const bcrypt = require("bcrypt");

//instantiate:
const router = new Router();

router.get("/", async (req, res) => {
  //res.send("Hello from users!!");
  //   try {
  const allUsers = await User.findAll();
  //// or res.json(allUsers)
  res.json({ allUsers });
  //   } catch (e) {
  //     next(e);
  //   }
});

router.post("/", async (req, res, next) => {
  try {
    // Instead of :
    // const fullName = req.body.fullName;
    // const email = req.body.email;
    // const password = req.body.password;
    // ...let's destructure:
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).send("Must provide all required data!");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);

      //Depending on the case, it might be preferable to do either
      // const newUser = await User.create(req.body)
      //...or
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      res.json({ newUser });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
