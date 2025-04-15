import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // store paths to images
  category: String,
  subCategory: String,
  rating: Number,
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
    },
  ],
  inStock: Boolean,
  freeShipping: Boolean,
});

export const Product = mongoose.model("Product", productSchema);
