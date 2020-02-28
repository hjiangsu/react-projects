const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    gender: String,
    age: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", DataSchema);