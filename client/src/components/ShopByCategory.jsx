import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CategoryDialog from "./CategoryDialog";
import Title from "./Title";

const ShopByCategory = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract unique categories
  const categories = [...new Set(products.map((product) => product.category))];
  console.log("My Categories", categories);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"SHOP BY"} text2={"CATEGORY"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Find exactly what you&apos;re looking for to enhance your lifestyle,
          simplify your routine, and make every day extraordinary.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className="p-4 border rounded-lg shadow hover:bg-gray-100"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Dialog */}
      {isDialogOpen && (
        <CategoryDialog
          category={selectedCategory}
          products={products}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ShopByCategory;
