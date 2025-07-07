const { required, boolean } = require("joi");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var licenseSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
// songSchema.index({title: 'text'},{slug: 'text'}, {description: 'text'},{hashtag:"text"});
licenseSchema.index({
  title: "text",
  slug: "text",
  description: "text"
});

const license = mongoose.model("license", licenseSchema);
// license.createIndexes();

//Export the model
module.exports = mongoose.model("license", licenseSchema);
