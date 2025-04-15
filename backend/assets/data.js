export const productLists = [
  // Electronics
  {
    name: "Gaming Laptop",
    description:
      "High-performance gaming laptop with the latest graphics and processing power.",
    price: 1200,
    image: "/assets/images/gameLaptop.png",
    category: "Electronics",
    subCategory: "Laptops",
    rating: 4.5,
    reviews: [
      { user: "John Doe", comment: "Amazing performance!", rating: 5 },
      { user: "Jane Smith", comment: "Great value for the price.", rating: 4 },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Iphone 15 pro",
    description:
      "Flagship Apple smartphone with a powerful processor and excellent camera.",
    price: 800,
    image: "/assets/images/iphone.jpg",
    category: "Electronics",
    subCategory: "Smartphones",
    rating: 4.7,
    reviews: [
      { user: "Alice Green", comment: "Superb camera quality!", rating: 5 },
      { user: "Tom Black", comment: "Fast and reliable.", rating: 4 },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Samsung Z Fold 5",
    description:
      "Samsung's innovative foldable smartphone with a large screen and powerful performance.",
    price: 1800,
    image: "/assets/images/samsung_z_fold.jpg",
    category: "Electronics",
    subCategory: "Smartphones",
    rating: 4.6,
    reviews: [
      {
        user: "John Doe",
        comment: "Amazing foldable display, a game changer!",
        rating: 5,
      },
      {
        user: "Emma White",
        comment: "Great multitasking capabilities.",
        rating: 4,
      },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Flagship Samsung smartphone with exceptional performance and a pro-grade camera system.",
    price: 1200,
    image: "/assets/images/samsung_s24_ultra.png",
    category: "Electronics",
    subCategory: "Smartphones",
    rating: 4.8,
    reviews: [
      {
        user: "Chris Red",
        comment: "The camera is fantastic, especially for night shots!",
        rating: 5,
      },
      {
        user: "Sophia Black",
        comment: "Top-notch performance and display.",
        rating: 5,
      },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Headphone",
    description:
      "Wireless noise-canceling headphones with immersive sound quality.",
    price: 200,
    image: "/assets/images/headphone.jpg",
    category: "Electronics",
    subCategory: "Headphones",
    rating: 4.6,
    reviews: [
      { user: "Chris Red", comment: "Best headphones I've used!", rating: 5 },
      { user: "Eva White", comment: "Perfect for traveling.", rating: 4 },
    ],
    inStock: true,
    freeShipping: false,
  },

  // Home Appliances
  {
    name: "Microwave Oven",
    description:
      "Compact microwave oven with multiple cooking modes and timer.",
    price: 120,
    image: "/assets/images/microwave.jpg",
    category: "Home Appliances",
    subCategory: "Kitchen Appliances",
    rating: 4.3,
    reviews: [
      {
        user: "Ron Davis",
        comment: "Very efficient and easy to use.",
        rating: 4,
      },
      { user: "Linda Young", comment: "Great for quick meals.", rating: 5 },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Refrigerator",
    description:
      "Spacious double-door refrigerator with energy-saving technology.",
    price: 1000,
    image: "/assets/images/refridgerator.jpg",
    category: "Home Appliances",
    subCategory: "Refrigerators",
    rating: 4.5,
    reviews: [
      {
        user: "Steve Miles",
        comment: "Keeps everything fresh for long.",
        rating: 5,
      },
      {
        user: "Nina Brown",
        comment: "Spacious and energy efficient.",
        rating: 4,
      },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Washing Machine",
    description:
      "High-efficiency front-load washing machine with multiple wash settings.",
    price: 500,
    image: "/assets/images/washing-mac.webp",
    category: "Home Appliances",
    subCategory: "Washing Machines",
    rating: 4.4,
    reviews: [
      {
        user: "Oscar Grey",
        comment: "Does a great job with heavy loads.",
        rating: 4,
      },
      { user: "Clara Black", comment: "Quiet and efficient.", rating: 5 },
    ],
    inStock: true,
    freeShipping: false,
  },

  // Furniture
  {
    name: "Modern Sofa",
    description: "Comfortable and stylish sofa, perfect for any living room.",
    price: 700,
    image: "/assets/images/Sofa.png",
    category: "Furniture",
    subCategory: "Living Room Furniture",
    rating: 4.6,
    reviews: [
      {
        user: "Karen Woods",
        comment: "Looks amazing in my living room!",
        rating: 5,
      },
      { user: "Paul Green", comment: "Very comfortable.", rating: 4 },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "King Size Bed",
    description:
      "Spacious king-size bed with a sturdy frame and stylish design.",
    price: 900,
    image: "/assets/images/bed.webp",
    category: "Furniture",
    subCategory: "Bedroom Furniture",
    rating: 4.7,
    reviews: [
      {
        user: "Dave White",
        comment: "Best sleep I've had in years.",
        rating: 5,
      },
      {
        user: "Emma Black",
        comment: "Solid build and comfortable.",
        rating: 4,
      },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Office Desk",
    description: "Spacious office desk with cable management features.",
    price: 300,
    image: "/assets/images/office-desk.jpg",
    category: "Furniture",
    subCategory: "Office Furniture",
    rating: 4.5,
    reviews: [
      { user: "Liam Grey", comment: "Perfect for my home office.", rating: 4 },
      { user: "Olivia Blue", comment: "Sturdy and spacious.", rating: 5 },
    ],
    inStock: true,
    freeShipping: false,
  },

  // Sports & Fitness
  {
    name: "Treadmill",
    description: "Foldable treadmill with multiple workout settings.",
    price: 600,
    image: "/assets/images/treadmill.png",
    category: "Sports & Fitness",
    subCategory: "Exercise Equipment",
    rating: 4.4,
    reviews: [
      { user: "John Doe", comment: "Great for daily cardio.", rating: 4 },
      { user: "Sophia Brown", comment: "Love the features.", rating: 5 },
    ],
    inStock: true,
    freeShipping: true,
  },
  {
    name: "Mountain Bike",
    description: "Durable mountain bike with shock absorption and 21 gears.",
    price: 450,
    image: "/assets/images/mountain-bike.webp",
    category: "Sports & Fitness",
    subCategory: "Outdoor Sports",
    rating: 4.3,
    reviews: [
      { user: "Mark Black", comment: "Handles rough terrain well.", rating: 4 },
      {
        user: "Linda Yellow",
        comment: "Excellent bike for beginners.",
        rating: 5,
      },
    ],
    inStock: true,
    freeShipping: false,
  },
  {
    name: "Yoga Mat",
    description: "High-quality, non-slip yoga mat for comfort and support.",
    price: 30,
    image: "/assets/images/yoga-mat.jpg",
    category: "Sports & Fitness",
    subCategory: "Apparel & Accessories",
    rating: 4.8,
    reviews: [
      {
        user: "Megan Violet",
        comment: "Perfect thickness for yoga.",
        rating: 5,
      },
      { user: "Tom Blue", comment: "Very comfortable and durable.", rating: 5 },
    ],
    inStock: true,
    freeShipping: true,
  },
];
