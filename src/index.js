const express = require("express");
const connectToDB = require("./dbConnection");
const authRouter = require("./routes/authRoutes");
const passport = require("passport");
require("./authentication/auth");

const app = express();

connectToDB();

app.use(express.json());
app.use("/user", authRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}...`);
});
