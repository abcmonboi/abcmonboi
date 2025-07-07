const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var videotheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index:true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("videotheme", videotheme);
