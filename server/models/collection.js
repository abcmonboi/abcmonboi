const mongoose = require("mongoose");

var collection = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
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
    },
    collection_type: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    song: [
      {
        type: mongoose.Types.ObjectId,
        ref: "song",
      },
    ],
    sfx: [
      {
        type: mongoose.Types.ObjectId,
        ref: "sfx",
      },
    ],
    album: [
      {
        type: mongoose.Types.ObjectId,
        ref: "album",
      },
    ],
    listen: {
      type: Number,
      default: 0,
    },
    thumbnail_collection: {
      type: String,
      required: false,
    },
    views: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
collection.index({ title: "text" });
module.exports = mongoose.model("collection", collection);
