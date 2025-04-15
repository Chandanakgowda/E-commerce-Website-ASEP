import { assets } from "@/assets/assets";
import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";

const Footer = () => {
  const { navigate } = useContext(ShopContext);
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-700">
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className="w-[10rem]" alt="Logo" />
          <p className="text-sm">
            Your one-stop destination for quality products at unbeatable prices!
            From groceries to electronics, fashion, and home essentials, we
            bring you a curated selection of the finest items to enhance your
            lifestyle. Visit us today for an unparalleled shopping experience.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:text-gray-900"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-gray-900"
              >
                About Us
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold mb-4">GET IN TOUCH</h3>
          <p className="text-sm">+1-212-456-7890</p>
          <p className="text-sm">contact@dstore.com</p>
        </div>
      </div>

      {/* Full-Width Horizontal Line and Copyright Information */}
      <div className="mt-12">
        <hr className="border-gray-200" />
        <p className="py-5 text-sm text-center text-gray-600">
          &copy; 2024 DStore.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
