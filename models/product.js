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
    },// this is an module that can be changed to have the updates for the app
  ],
  inStock: Boolean,
  freeShipping: Boolean,
});

export const Product = mongoose.model("Product", productSchema);
