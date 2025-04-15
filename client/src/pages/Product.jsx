import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext";
import { assets } from "@/assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, updateQuantity, cartItems } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [cartData, setCartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the product using the productId
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    // console.log("p", products, "d", productData);
    setProductData(product || null);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="w-full sm:w-[80%] cursor-pointer">
            <img
              className="w-auto h-[350px]"
              src={`http://localhost:4000${productData.image}`}
              alt="Product"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-3xl mt-2 text-start">
            {productData.name}
          </h1>

          <p className="mt-5 text-gray-500 md:w-4/5 text-start">
            {productData.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="mt-5 text-xl font-medium">
              {currency}
              {productData.price}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <p className="text-yellow-500">⭐ {productData.rating} / 5</p>
              <p className="pl-2">({productData.reviews?.length || 0})</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <button
              onClick={() => addToCart(productData._id)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer"
            >
              <img
                src={assets.viewCart}
                alt="view cart"
                title="view cart"
                className="cursor-pointer w-[45px]"
              />
            </div>

            {/* Modal to show cart items */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 max-w-[400px] w-full rounded-[8px] overflow-y-scroll max-h-[70vh]">
                  <div className="text-xl mb-4 font-bold">Cart Items</div>
                  {cartData.length === 0 ? (
                    <div className="text-center flex flex-col gap-3 justify-center items-center">
                      <img
                        src={assets.emptyCart}
                        alt="view cart"
                        title="view cart"
                        className="cursor-pointer w-[75px]"
                      />
                      <p className="text-xs text-gray-600">
                        Your Cart Is Empty
                      </p>
                    </div>
                  ) : (
                    cartData.map((item, index) => {
                      const productData = products.find(
                        (product) => product._id === item._id
                      );
                      return (
                        <div
                          key={index}
                          className="py-2 border-b flex items-center gap-4 justify-between"
                        >
                          <img
                            className="w-16"
                            src={`http://localhost:4000${productData.image}`}
                            alt="product"
                          />
                          <div className="flex items-center justify-between w-[100%]">
                            <p className="font-medium">{productData.name}</p>
                            <p className="text-xs">
                              quantity: ({item.quantity})
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)} // Close modal
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-[6px] text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Cart Data */}
            <div>
              {cartData.length === 0 ? (
                <div className="text-center hidden">
                  <img
                    src={assets.emptyCart} // Replace with actual empty cart image
                    alt="Empty Cart"
                    className="mx-auto w-56 object-contain "
                  />
                </div>
              ) : (
                cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id
                  );
                  return (
                    <div
                      key={index}
                      className="py-4 border-t border-b text-gray-700  grid-cols-[4fr_0.5fr_0.5fr] sm:[4fr_2fr_0.5fr] items-center gap-4 hidden"
                    >
                      <div className="flex items-start gap-6">
                        <img
                          className="w-16 sm:w-20"
                          src={`http://localhost:4000${productData.image}`}
                          alt="product"
                        />
                        <div>
                          <p className="text-xs sm:text-lg font-medium">
                            {productData.name}
                          </p>
                          <div className="flex items-center gap-5 mt-2">
                            <p>
                              {currency}
                              {productData.price}
                            </p>
                            <input
                              onChange={(e) =>
                                e.target.value === "" || e.target.value === "0"
                                  ? null
                                  : updateQuantity(
                                      item._id,
                                      Number(e.target.value)
                                    )
                              }
                              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-0 "
                              type="number"
                              min={1}
                              defaultValue={item.quantity}
                            />
                            <img
                              onClick={() => updateQuantity(item._id, 0)}
                              src={assets.bin_icon}
                              className="w-4 sm:w-5 cursor-pointer"
                              alt="delete-icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-xs text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Tab Section */}
      <div className="mt-20">
        {/* Tab Headers */}
        <div className="flex">
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "description" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "reviews" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Review ({productData.reviews?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div className="border px-6 py-6 text-sm text-gray-500">
          {activeTab === "description" && (
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
          )}
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {productData.reviews &&
                productData.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b pb-4 flex flex-col items-start"
                  >
                    <p className="font-semibold">{review.user}</p>
                    <p>{review.comment}</p>
                    <p className="text-yellow-500">⭐ {review.rating} / 5</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
