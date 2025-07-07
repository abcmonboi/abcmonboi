const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var themeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      utf8: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    themesArtwork: {
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

themeSchema.index({title: 'text', slug: 'text', description: 'text'});
//Export the model
const themes = mongoose.model("themes", themeSchema);
// themes.createIndexes();
// module.exports = themes;

module.exports = mongoose.model("themes", themeSchema);
