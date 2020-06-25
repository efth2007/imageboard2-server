const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

//Body-parser middleware:
app.use(express.json());

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
app.get("/", (req, res) => res.send("Hello"));

app.use("/users", userRouter);
app.use("/images", imageRouter);
