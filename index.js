const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
//
const authRouter = require("./routers/auth");

//Body-parser middleware: (when we make a request to the server that includes some data, see 5.55 of  https://youtu.be/Rr4qeVQYB-s )
app.use(express.json());

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
app.get("/", (req, res) => res.send("Hello"));

app.use("/users", userRouter);
app.use("/images", imageRouter);
//
app.use("/login", authRouter);
