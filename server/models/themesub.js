const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var themesubSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      utf8: true,
    },
    themes:[{
        type: mongoose.Types.ObjectId,
        ref: "themes",
        // required: true,
    }],
    song: [
        {
          type: mongoose.Types.ObjectId,
          ref: "song",
        },
      ],
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    themesubArtwork: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    views : {
        type: Number,
        required: false,
        default: 0,
    },

  },
  {
    timestamps: true,
  } ,


);

themesubSchema.index({title: 'text', slug: 'text', description: 'text'});
//Export the model
const themesub = mongoose.model("themesub", themesubSchema);
// themesub.createIndexes();
module.exports = mongoose.model("themesub", themesubSchema);
// module.exports = themesub;

