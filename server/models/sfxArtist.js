const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var sfxArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // đồng hồ apple - slug: dong-ho-apple
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    thumbnail: {
      type: Object,
      required: false,
    },
    thumbnail_medium: {
      type: Object,
      required: false,
    },
    cover: {
      type: Object,
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
module.exports = mongoose.model("sfxArtist", sfxArtistSchema);
