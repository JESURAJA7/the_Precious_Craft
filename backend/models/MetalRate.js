// models/MetalRate.js
const mongoose = require("mongoose");

const metalRateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: () => new Date(),
      index: true,
    },
    gold: {
      type: Number, // price per gram
      required: true,
    },
    silver: {
      type: Number,
      required: true,
    },
    brass: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// you will usually use the latest document
metalRateSchema.index({ createdAt: -1 });

module.exports = mongoose.model("MetalRate", metalRateSchema);
