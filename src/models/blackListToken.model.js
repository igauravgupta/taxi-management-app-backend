import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60, // 24 hours
  },
});

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);

export {BlackListToken };
