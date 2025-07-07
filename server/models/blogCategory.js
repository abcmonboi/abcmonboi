const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      utf8: false,
    },
    // đồng hồ apple - slug: dong-ho-apple
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

    blogCategory_thumbnail: {
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
// songSchema.index({title: 'text'},{slug: 'text'}, {description: 'text'},{hashtag:"text"});
blogCategorySchema.index({
  title: "text",
  slug: "text",
  description: "text"
  // hashtag: "text",
});

const blogCategory = mongoose.model("blogCategory", blogCategorySchema);
// song.createIndexes();

//Export the model
module.exports = mongoose.model("blogCategory", blogCategorySchema);
