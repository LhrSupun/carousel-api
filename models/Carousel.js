const mongoose = require("mongoose");

const { Schema } = mongoose;

const CarouselSchema = new Schema(
  {
    title: String,
    image: String,
    subTitle: String,
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Carousel", CarouselSchema);
