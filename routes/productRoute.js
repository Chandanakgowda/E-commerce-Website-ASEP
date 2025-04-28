import express from "express";
import {
  listProducts,
  singleProduct,
} from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.get("/list", listProducts);
productRouter.post("/single", singleProduct);
