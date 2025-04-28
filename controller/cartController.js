import { userModel } from "../models/userModel.js";

// add products to users cart
// Add products to user's cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find the user by ID
    const userData = await userModel.findById(userId);

    // Get the current cart data
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    // Respond with success
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// // update Cart
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, quantity } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;

//     cartData[itemId] = quantity;
//     console.log(quantity, "q");

//     await userModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: "Cart Updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Validate the quantity
    if (quantity === undefined || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    // Fetch the user data
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    if (quantity > 0) {
      // Update or add the item
      cartData[itemId] = quantity;
    } else {
      // Remove the item if quantity is 0
      delete cartData[itemId];
    }

    // Save the updated cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get User cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
