const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the service name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the service description"],
    },
    priceRange: {
      min: {
        type: Number,
        required: [true, "Please enter the minimum price"],
      },
      max: {
        type: Number,
        required: [true, "Please enter the maximum price"],
      }
    }
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
