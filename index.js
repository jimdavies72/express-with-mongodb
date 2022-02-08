require("dotenv").config();

const express = require("express");
const app = express();

const connection = require("./connection");
const User = require("./models/user");
const userRouter = require("./routes/user");

app.use(express.json());
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("App is online");
});
