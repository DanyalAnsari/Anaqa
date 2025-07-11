import mongoose from "mongoose";
import Product from "./src/models/ProductModel.js";
import dotenv from "dotenv";

dotenv.config();


// Base URL for images
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Sample product data
const sampleProducts = [
	{
		name: "Women Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 100,
		stock: 50,
		images: [`${BASE_URL}/images/products/p_img1.png`],
		mainCategory: "women",
		subCategory: "topwear",
		sizes: ["S", "M", "L"],
		bestseller: true,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 200,
		stock: 40,
		images: [
			`${BASE_URL}/images/products/p_img2_1.png`,
			`${BASE_URL}/images/products/p_img2_2.png`,
			`${BASE_URL}/images/products/p_img2_3.png`,
			`${BASE_URL}/images/products/p_img2_4.png`,
		],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["M", "L", "XL"],
		bestseller: true,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 220,
		stock: 30,
		images: [`${BASE_URL}/images/products/p_img3.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "L", "XL"],
		bestseller: true,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 110,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img4.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "XXL"],
		bestseller: true,
	},
	{
		name: "Women Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 130,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img5.png`],
		mainCategory: "women",
		subCategory: "topwear",
		sizes: ["M", "L", "XL"],
		bestseller: true,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 140,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img6.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "L", "XL"],
		bestseller: true,
	},
	{
		name: "Men Tapered Fit Flat-Front Trousers",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 190,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img7.png`],
		mainCategory: "men",
		subCategory: "bottomwear",
		sizes: ["S", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 140,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img8.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 100,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img9.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Tapered Fit Flat-Front Trousers",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 110,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img10.png`],
		mainCategory: "men",
		subCategory: "bottomwear",
		sizes: ["S", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 120,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img11.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 150,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img12.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 130,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img13.png`],
		mainCategory: "women",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Boy Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 160,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img14.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Tapered Fit Flat-Front Trousers",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 140,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img15.png`],
		mainCategory: "men",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 170,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img16.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Tapered Fit Flat-Front Trousers",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 150,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img17.png`],
		mainCategory: "men",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Boy Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 180,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img18.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Boy Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 160,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img19.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Palazzo Pants with Waist Belt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 190,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img20.png`],
		mainCategory: "women",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Zip-Front Relaxed Fit Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 170,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img21.png`],
		mainCategory: "women",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Palazzo Pants with Waist Belt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 200,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img22.png`],
		mainCategory: "women",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Boy Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 180,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img23.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Boy Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 210,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img24.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 190,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img25.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Zip-Front Relaxed Fit Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 220,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img26.png`],
		mainCategory: "women",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 200,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img27.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Slim Fit Relaxed Denim Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 230,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img28.png`],
		mainCategory: "men",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 210,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img29.png`],
		mainCategory: "women",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 240,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img30.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 220,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img31.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 250,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img32.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Girls Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 230,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img33.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 260,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img34.png`],
		mainCategory: "women",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Zip-Front Relaxed Fit Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 240,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img35.png`],
		mainCategory: "women",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Zip-Front Relaxed Fit Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 270,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img36.png`],
		mainCategory: "women",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Round Neck Cotton Top",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 250,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img37.png`],
		mainCategory: "women",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 280,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img38.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Printed Plain Cotton Shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 260,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img39.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Slim Fit Relaxed Denim Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 290,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img40.png`],
		mainCategory: "men",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 270,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img41.png`],
		mainCategory: "men",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Boy Round Neck Pure Cotton T-shirt",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 300,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img42.png`],
		mainCategory: "kids",
		subCategory: "topwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Kid Tapered Slim Fit Trouser",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 280,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img43.png`],
		mainCategory: "kids",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Zip-Front Relaxed Fit Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 310,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img44.png`],
		mainCategory: "women",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Slim Fit Relaxed Denim Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 290,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img45.png`],
		mainCategory: "men",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Slim Fit Relaxed Denim Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 320,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img46.png`],
		mainCategory: "men",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Kid Tapered Slim Fit Trouser",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 300,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img47.png`],
		mainCategory: "kids",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Slim Fit Relaxed Denim Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 330,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img48.png`],
		mainCategory: "men",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Kid Tapered Slim Fit Trouser",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 310,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img49.png`],
		mainCategory: "kids",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Kid Tapered Slim Fit Trouser",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 340,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img50.png`],
		mainCategory: "kids",
		subCategory: "bottomwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Women Zip-Front Relaxed Fit Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 320,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img51.png`],
		mainCategory: "women",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
	{
		name: "Men Slim Fit Relaxed Denim Jacket",
		description:
			"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
		price: 350,
		stock: 100,
		images: [`${BASE_URL}/images/products/p_img52.png`],
		mainCategory: "men",
		subCategory: "winterwear",
		sizes: ["S", "M", "L", "XL"],
		bestseller: false,
	},
].map((product) => ({
	...product,
	bestseller: Math.random() < 0.5, // Randomize bestseller as boolean
}));

// Initialize database function
async function initializeDatabase() {
  try {
    console.log("Database initialization started");

    // Connect to MongoDB
    const uri = process.env.MONGO_DB_URI || "mongodb://localhost:27017/";
    const dbName = process.env.MONGO_DB_NAME || "ecom";

    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(`${uri}${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Prepare products with proper references
    const productsToInsert = sampleProducts.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images,
      category: product.mainCategory,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestseller: product.bestseller,
    }));

    // Insert products
    await Product.insertMany(productsToInsert);
    console.log("Products inserted");

    console.log("Database initialization completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error initializing database:", error);
    return { success: false, error };
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}



initializeDatabase()
