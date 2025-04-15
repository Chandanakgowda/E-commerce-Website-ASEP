/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
// import { assets } from "../assets/assets"; // Make sure this import is correct

const Productitem = ({
  id,
  image,
  name,
  price,
  inStock,
  rating,
  freeShipping,
}) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer flex flex-col items-center"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden w-full h-72 flex justify-center items-center bg-gray-100">
        <img
          className="hover:scale-110 transition-all ease-in-out h-full w-auto object-contain"
          src={`http://localhost:4000${image}`}
          alt={name}
        />
      </div>
      <div className="bg-gray-300 w-[100%] min-h-32 rounded-b-md">
        <p className="pt-3 pb-1 text-sm font-semibold ">{name}</p>
        <div className="flex justify-between items-center p-4">
          <p className="text-sm font-medium ">
            {currency}
            {price}
          </p>
          {inStock ? (
            <p className="text-xs text-green-500 ">In Stock</p>
          ) : (
            <p className="text-xs text-red-500 ">Out of Stock</p>
          )}
        </div>
        <div className="flex justify-between  items-center p-4">
          <p className="text-[10px] text-yellow-500 ">{rating} / 5 ⭐ </p>
          {freeShipping && (
            <p className="text-[10px] text-blue-500 ">Free Shipping</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Productitem;
