const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var sfxPackSchema = new mongoose.Schema(
  {
    title: {
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
    sfxArtist: {
      type: mongoose.Types.ObjectId,
      ref: "sfxArtist",
    },
    // sfxBy: {
    //   type: String,
    //   required: true,
    // },
    sfxCategory: {
      type: mongoose.Types.ObjectId,
      ref: "sfxCategory",
    },
    streaming: {
      type: Object,
    },
    price: {
      type: Number,
      required: false,
    },
    like: [
      {
        isLike: { type: Boolean },
        postedBy: { type: mongoose.Types.ObjectId, ref: "user" },
      },
    ],
    totalLike: {
      type: Number,
      default: 0,
    },
    listen: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: Object,
      required: false,
    },
    thumbnail_medium: {
      type: Object,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "user" },
        comment: { type: String },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
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
module.exports = mongoose.model("sfxPack", sfxPackSchema);
