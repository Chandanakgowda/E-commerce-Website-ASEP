import express from "express";

import {
  placeOrder,
  placeOrderStripe,
  userOrders,
  verifyStripe,
} from "../controller/orderController.js";
import { authUser } from "../middleware/auth.js";

export const orderRouter = express.Router();

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// user Features
orderRouter.post("/userorders", authUser, userOrders);

// verify Payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
