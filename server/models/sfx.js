const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var sfxSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
    artists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "artist",
      },
    ],

    sfxCategory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SfxCategory",
      },
    ],
    moods:[ {
      type: mongoose.Types.ObjectId,
      ref: "mood",
    }],
    streaming: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    totalLikes: {
      type: Number,
      default: 0,
    },
    listen: {
      type: Number,
      default: 0,
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
    tempo: {
      type: Number,
      required: false,
    },
    copyrightStatus: {
      type: Number,
      required: false,
    },
    hashtag: [
      {
        type: String,
      },
    ],

    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],

    totalDislikes: {
      type: Number,
      default: 0,
    },
    numberView: {
      type: Number,
      default: 0,
    },
    downloads : {
      type: Number,
      default: 0,
    },
    waveform: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Export the model
module.exports = mongoose.model("sfx", sfxSchema);
