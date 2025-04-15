/* eslint-disable no-case-declarations */
import { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Placeorder = () => {
  const [paymentMethod, setpaymentMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setcartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Prepare order items
      let orderItems = [];
      for (const productId in cartItems) {
        const quantity = cartItems[productId];

        if (quantity > 0) {
          // Find product details
          const product = products.find((product) => product._id === productId);

          if (product) {
            // Ensure required fields match backend expectations
            orderItems.push({
              prodname: product.name, // Product name (ensure backend expects "prodname")
              price: product.price, // Unit price
              quantity: quantity,
              image: product.image,
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty. Please add items to proceed.");
        return;
      }

      // Prepare order data to send to the backend
      const orderData = {
        address: formData, // User-provided address
        items: orderItems, // Prepared items array
        amount: getCartAmount() + delivery_fee, // Total order amount
      };

      switch (paymentMethod) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          // Send order data for Stripe payment
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe", // API route to your backend
            orderData,
            { headers: { token } } // Pass token for authentication
          );

          console.log("Stripe Response:", responseStripe.data); // Debugging log

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data; // Extract session_url
            if (session_url) {
              // Redirect to Stripe's Checkout page
              window.location.replace(session_url);
            } else {
              toast.error("Session URL is missing from the server response.");
            }
          } else {
            toast.error(
              responseStripe.data.message || "Failed to initiate payment."
            );
          }
          break;
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred while processing the payment.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* -------Left Side----------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstname"
            value={formData.firstname}
            onChange={onChangeHandler}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Email address"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="City"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Zipcode"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Phone"
        />
      </div>

      {/* -------Right Side------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <Title text1={"PAYMENT"} text2={"METHOD"} />
        {/* ----------PAYMENT Method Selection----- */}
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => setpaymentMethod("stripe")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === "stripe" ? "bg-green-500" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">PAY ONLINE</p>
          </div>
          <div
            onClick={() => setpaymentMethod("cod")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === "cod" ? "bg-green-500" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white py-3 px-16 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
