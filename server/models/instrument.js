const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var instrument = new mongoose.Schema(
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
instrument.index({name: 'text'});

//Export the model
module.exports = mongoose.model("instrument", instrument);
