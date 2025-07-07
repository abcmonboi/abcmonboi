const mongoose = require("mongoose"); // Erase if already required
const bcsypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim : true,
    },
    lastname: {
      type: String,
      required: true,
      trim : true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim : true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim : true,
    },
    password: {
      type: String,
      required: true,
      trim : true,
    },
    role: {
      type: String,
      // default: "user",
      enum : [6699 , 1346],
      default: 1346,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Types.ObjectId, ref: "address" }],
    addressString: { type: String, default: "" },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "song" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
    avatar: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    age : {
      type: String,
      required: false,
    },
    gender : {
      type: Number ,
      required: false,
    },
    registerToken: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcsypt.genSaltSync(10);
  this.password = await bcsypt.hash(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcsypt.compare(password, this.password);
  },
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};

//Export the model
module.exports = mongoose.model("user", userSchema);
