const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      utf8: true,
    },
    // đồng hồ apple - slug: dong-ho-apple
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isrc: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    artists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "artist",
      },
    ],
    composers: {
      type: mongoose.Types.ObjectId,
      ref: "artist",
    },
    artists_names: {
      type: String,
      required: false,
    },
    genres: [
      {
        type: mongoose.Types.ObjectId,
        ref: "genre",
      },
    ],
    moods: [
      {
        type: mongoose.Types.ObjectId,
        ref: "mood",
      },
    ],
    instruments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "instrument",
      },
    ],
    videothemes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "videotheme",
      },
    ],
    album: {
      type: mongoose.Types.ObjectId,
      ref: "album",
    },
    streaming: {
      type: String,
      required: false,
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
      type: String,
      required: false,
    },
    thumbnail_medium: {
      type: String,
      required: false,
    },
    mv_link: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
      default: 0,
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
    isOfficial: {
      type: Boolean,
      required: false,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    tempo: {
      type: Number,
      required: false,
    },
    copyrightStatus: {
      type: Number,
      required: false,
      default: 1,
    },
    views: {
      type: Number,
      default: 0,
      required: false,
    },
    downloads: {
      type: Number,
      default: 0,
      required: false,
    },
    waveform: {
      type: String,
      required: false,
    },
    // license: {
    //   type: Number,
    //   required: false,
    // },
    license: 
      {
        type: mongoose.Types.ObjectId,
        ref: "license",
      },
    hashtag: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
// songSchema.index({title: 'text'},{slug: 'text'}, {description: 'text'},{hashtag:"text"});
songSchema.index({
  title: "text",
  slug: "text",
  description: "text",
  hashtag: "text",
});

const song = mongoose.model("song", songSchema);
// song.createIndexes();

//Export the model
module.exports = mongoose.model("song", songSchema);
