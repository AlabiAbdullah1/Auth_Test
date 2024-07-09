const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI);

function connectToDB() {
  mongoose.connection.on("connected", () => {
    console.log("DB connected Successfully!");
  });

  mongoose.connection.on("error", () => {
    console.log("Error coonection to the DB");
  });
}

module.exports = connectToDB;
