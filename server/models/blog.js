const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      // utf8: true,
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

    author: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    artists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "artist",
      },
    ],
    blogCategory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "blogCategory",
      },
    ],
    blog_thumbnail: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
      required: false,
    },
    hashtag: [
      {
        type: String,
        required: false,
      },
    ],
    seo_title: {
      type: String,
      required: false,
    },
    seo_description: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true,
  }
);
// songSchema.index({title: 'text'},{slug: 'text'}, {description: 'text'},{hashtag:"text"});
blogSchema.index({
  title: "text",
  slug: "text",
  description: "text",
  hashtag: "text",
});

const blog = mongoose.model("blog", blogSchema);
// song.createIndexes();

//Export the model
module.exports = mongoose.model("blog", blogSchema);
