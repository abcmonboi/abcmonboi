const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var sfxCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    video_thumnail: {
      type: String,
      required: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("SfxCategory", sfxCategorySchema);
