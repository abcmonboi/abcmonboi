const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var genre = new mongoose.Schema(
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
    description: {
      type: String,
      required: false,
      index:true,
    },
  },
  {
    timestamps: true,
  }
);
genre.index({name: 'text'});

//Export the model
module.exports = mongoose.model("genre", genre);
