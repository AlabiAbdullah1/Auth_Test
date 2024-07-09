const { Router } = require("express");
const authController = require("../controller/authController");
const passport = require("passport");
const { Response, NextFunction } = require("express");
// const { UserAddSchema } = require("../validator/auth.validator");
// const validator = require("../validator/validator");
require("dotenv").config();

const authRouter = Router();
const next = NextFunction;
const res = Response;

authRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authController.getUser
);

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  authController.signup_post
);

// authRouter.post(
//   "/signup",
//   // validator.validateSchema(UserAddSchema),
//   authController.signup_post
// );
authRouter.post("/login", authController.login_post);

module.exports = authRouter;
