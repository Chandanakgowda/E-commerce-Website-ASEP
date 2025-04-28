import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import Stripe from "stripe";

// global varible
const deliveryCharge = 10;
const currency = "usd";

//Stripe gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order using COD
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      Date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // clear cart of user after order placed.
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// // Placing order using Stripe
// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const { origin } = req.headers;

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       Date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.prodname,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 10 * 100, // Delivery charge example
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//       line_items,
//       mode: "payment",
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// verify Stripe
export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Validate the items array
    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "No items found in the order.",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Online",
      payment: false,
      Date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Construct line_items for Stripe Checkout
    const line_items = items.map((item) => {
      if (!item.prodname || !item.price || !item.quantity) {
        throw new Error(
          "Missing required item details (prodname, price, or quantity)."
        );
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.prodname,
            // // Optionally add description or images here
            // description: item.description || "No description available",
            // images: item.image ? [item.image] : [],
          },
          unit_amount: item.price * 100, // Convert price to smallest currency unit (e.g., paise for INR)
        },
        quantity: item.quantity,
      };
    });

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 10 * 100, // Example delivery charge
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card"], // Ensure "card" is included
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in placeOrderStripe:", error);
    res.json({ success: false, message: error.message });
  }
};

// all orders data for Frontend
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
