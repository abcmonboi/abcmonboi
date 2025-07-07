const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var metaTagSchema = new mongoose.Schema(
  {
    meta_url: {
      type: String,
      required: [true, "meta_url is required"],
      unique: [true, "meta_url is unique"],
      lowercase: true,
      trim: true,
    },
    meta_title: {
        type: String,
        required: true,
        trim: true,
        // utf8: true,
      },
    meta_desc: {
      type: String,
      required: true,
      trim: true,
    },
    meta_image: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("metaTag", metaTagSchema);
