import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
const CategoryDialog = ({ category, products, onClose }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Extract unique subcategories for the selected category
  const subcategories = [
    "All",
    ...new Set(
      products
        .filter(
          (product) => product.category === category && product.subCategory
        )
        .map((product) => product.subCategory)
    ),
  ];

  // Filter products by category and subcategory
  const filteredProducts = products.filter(
    (product) =>
      product.category === category &&
      (selectedSubcategory === "All" ||
        product.subCategory === selectedSubcategory)
  );

  useEffect(() => {
    setLoading(false);
  }, [filteredProducts]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-[8px] p-6 w-3/4 h-4/5 overflow-y-auto relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-red-500 text-xl font-bold"
          onClick={onClose}
        >
          X
        </button>

        {/* Title */}
        <h2 className="text-sm font-semibold mb-4">{category}</h2>

        {/* Subcategory Filter */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-start">
            Filter by Subcategory
          </h3>
          <div className="flex gap-2 mt-2 flex-wrap text-[8px]">
            {subcategories.map((subcat) => (
              <button
                key={subcat}
                className={`px-4 py-2 border rounded ${
                  selectedSubcategory === subcat ? "bg-gray-200" : "bg-gray-100"
                } hover:bg-gray-300`}
                onClick={() => setSelectedSubcategory(subcat)}
              >
                {subcat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            {/* Display Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <div className="p-4 border rounded-lg shadow hover:shadow-lg">
                      <img
                        src={`http://localhost:4000${product.image}`}
                        alt={product.name}
                        className="w-full h-32 object-contain rounded"
                      />
                      <h3 className="text-lg font-semibold mt-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // No Products Found
              <p className="text-center text-gray-500 mt-4">
                No products available in this category.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryDialog;
