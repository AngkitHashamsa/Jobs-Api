const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide Company Name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please Provide Company Name"],
      maxLength: 50,
    },
    status: {
      type: String,
      enum: ["interview", "decline", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
