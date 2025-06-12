const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Category = require('@models/CategoryModel');
const Product = require('@models/ProductModel');
require('dotenv').config();

// Import models properly
// const Category = mongoose.models.category || mongoose.model("category", categorySchema);
// const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// Create directories
const publicImagesDir = path.join(process.cwd(), "public", "images", "products");
const categoriesDir = path.join(process.cwd(), "public", "images", "categories");

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

if (!fs.existsSync(categoriesDir)) {
  fs.mkdirSync(categoriesDir, { recursive: true });
}

// Base URL for images
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

// Copy images from assets to public directory
function copyImagesToPublic() {
  try {
    // List of image files to copy
    const imageFiles = fs.readdirSync(path.join(process.cwd(), "assets", "images"));
    
    for (const file of imageFiles) {
      const sourceFile = path.join(process.cwd(), "assets", "images", file);
      const targetFile = path.join(process.cwd(), "public", "images", "products", file);
      
      // Create directory if it doesn't exist
      const targetDir = path.dirname(targetFile);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Copy the file if it exists
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`Copied ${file} to /images/products/${file}`);
      }
    }
    console.log("All images copied to public directory");
  } catch (error) {
    console.error("Error copying images:", error);
  }
}

// Category and subcategory data
const mainCategories = [
  { name: "women", description: "Women's clothing and accessories" },
  { name: "men", description: "Men's clothing and accessories" },
  { name: "kids", description: "Kids' clothing and accessories" }
];

const subCategories = [
  { name: "topwear", description: "Tops, shirts, t-shirts, etc." },
  { name: "bottomwear", description: "Pants, trousers, jeans, etc." },
  { name: "winterwear", description: "Jackets, sweaters, coats, etc." }
];

// Sample product data
const sampleProducts = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    stock: 50,
    images: [`${BASE_URL}/images/products/p_img1.png`],
    mainCategory: "women",
    subCategory: "topwear",
    sizes: ["S", "M", "L"],
    bestseller: true
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    stock: 40,
    images: [
      `${BASE_URL}/images/products/p_img2_1.png`,
      `${BASE_URL}/images/products/p_img2_2.png`,
      `${BASE_URL}/images/products/p_img2_3.png`,
      `${BASE_URL}/images/products/p_img2_4.png`
    ],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    stock: 30,
    images: [`${BASE_URL}/images/products/p_img3.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "L", "XL"],
    bestseller: true
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img4.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "XXL"],
    bestseller: true
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img5.png`],
    mainCategory: "women",
    subCategory: "topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img6.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "L", "XL"],
    bestseller: true
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img7.png`],
    mainCategory: "men",
    subCategory: "bottomwear",
    sizes: ["S", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img8.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img9.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img10.png`],
    mainCategory: "men",
    subCategory: "bottomwear",
    sizes: ["S", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 120,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img11.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img12.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img13.png`],
    mainCategory: "women",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img14.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img15.png`],
    mainCategory: "men",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img16.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img17.png`],
    mainCategory: "men",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img18.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img19.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img20.png`],
    mainCategory: "women",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img21.png`],
    mainCategory: "women",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img22.png`],
    mainCategory: "women",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img23.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img24.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img25.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img26.png`],
    mainCategory: "women",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img27.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img28.png`],
    mainCategory: "men",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img29.png`],
    mainCategory: "women",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img30.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img31.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img32.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img33.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img34.png`],
    mainCategory: "women",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img35.png`],
    mainCategory: "women",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img36.png`],
    mainCategory: "women",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img37.png`],
    mainCategory: "women",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img38.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Printed Plain Cotton Shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img39.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img40.png`],
    mainCategory: "men",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img41.png`],
    mainCategory: "men",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img42.png`],
    mainCategory: "kids",
    subCategory: "topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img43.png`],
    mainCategory: "kids",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img44.png`],
    mainCategory: "women",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img45.png`],
    mainCategory: "men",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img46.png`],
    mainCategory: "men",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img47.png`],
    mainCategory: "kids",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 330,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img48.png`],
    mainCategory: "men",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img49.png`],
    mainCategory: "kids",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 340,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img50.png`],
    mainCategory: "kids",
    subCategory: "bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img51.png`],
    mainCategory: "women",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 350,
    stock: 100,
    images: [`${BASE_URL}/images/products/p_img52.png`],
    mainCategory: "men",
    subCategory: "winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  }
].map(product => ({
  ...product,
  bestseller: Math.random() < 0.5, // Randomize bestseller as boolean
  featured: Math.random() < 0.5    // Add and randomize featured as boolean
}));

// Initialize database function
async function initializeDatabase() {
  try {
    console.log("Database initialization started");
    
    // Connect to MongoDB
    const uri = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/';
    const dbName = process.env.MONGO_DB_NAME || 'ecom';
    
    await mongoose.connect(`${uri}${dbName}`);
    console.log('Connected to MongoDB');
    
    // Copy images to public directory
    copyImagesToPublic();
    
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert main categories
    const savedMainCategories = await Category.insertMany(mainCategories);
    console.log('Main categories inserted');
    
    // Create category map for reference
    const categoryMap = {};
    savedMainCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });
    
    // Insert subcategories with parent references
    const subCatsToInsert = [];
    
    for (const mainCat of savedMainCategories) {
      for (const subCat of subCategories) {
        subCatsToInsert.push({
          name: `${subCat.name} for ${mainCat.name}`,
          description: `${subCat.description} for ${mainCat.name}`,
          parent_category: mainCat._id
        });
      }
    }
    
    const savedSubCategories = await Category.insertMany(subCatsToInsert);
    console.log('Subcategories inserted');
    
    // Create a mapping for subcategories
    savedSubCategories.forEach(subCat => {
      const parentCat = savedMainCategories.find(
        cat => cat._id.toString() === subCat.parent_category.toString()
      );
      
      if (parentCat) {
        const key = `${parentCat.name}:${subCat.name.split(' for ')[0]}`;
        categoryMap[key] = subCat._id;
      }
    });
    
    // Prepare products with proper references
    const productsToInsert = sampleProducts.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      discountedPrice: product.price, // Same as price for now
      stock: product.stock,
      images: product.images,
      category: categoryMap[product.mainCategory],
      subCategory: categoryMap[`${product.mainCategory}:${product.subCategory}`],
      sizes: product.sizes,
      bestseller: product.bestseller,
      featured: product.featured, // Add featured field
      isActive: true,
      ratings: { average: 0, count: 0 }
    }));
    
    // Insert products
    await Product.insertMany(productsToInsert);
    console.log('Products inserted');
    
    console.log('Database initialization completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error };
  }
}

module.exports = initializeDatabase;