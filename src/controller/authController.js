const User = require("../model/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");

module.exports.getUser = async (req, res, next) => {
  const projection = {
    password: 0,
    _id: 0,
    createdAt: 0,
    lastUpdatedAt: 0,
    __v: 0,
  };

  User.find({}, projection).then((users) => {
    res.status(200).json({
      message: "Success!",
      users,
    });
  });
};

module.exports.signup_post = async (req, res) => {
  try {
    return res.json({
      message: "Signup successful",
      user: req.body._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.login_post = async function (req, res, next) {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
