const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a Name"],
      minLength: 3,
      maxLength: 25,
    },

    email: {
      type: String,
      required: [true, "Please Provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide valid Email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  // next();
});

userSchema.methods.createJwt = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN }
  );
};

userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bycrypt.compare(userPassword, this.password);

  return isMatch;
};
module.exports = mongoose.model("User", userSchema);
