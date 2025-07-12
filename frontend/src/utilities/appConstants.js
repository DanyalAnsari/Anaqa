const menu = [
	{ path: "/", label: "HOME" },
	{ path: "/products", label: "COLLECTION" },
	{ path: "/about", label: "ABOUT" },
	{ path: "/contact", label: "CONTACT US" },
];

const mockProduct = {
	_id: "685d64fff3ee6066dfa4b1a8",
	name: "Kid Tapered Slim Fit Trouser",
	description:
		"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
	price: 280,
	images: [
		"http://localhost:5000/images/products/p_img43.png",
		"http://localhost:5000/images/products/p_img44.png",
		"http://localhost:5000/images/products/p_img45.png",
		"http://localhost:5000/images/products/p_img46.png",
	],
	category: "kids",
	subCategory: "bottomwear",
	sizes: ["S", "M", "L", "XL"],
	featured: false,
	bestseller: true,
	rating: 4.5,
	reviews: 127,
	originalPrice: 350,
	discount: 20,
	stock: 15,
	sold: 342,
	createdAt: "2025-06-26T15:19:27.221Z",
	updatedAt: "2025-06-26T15:19:27.221Z",
};

const mockReviews = [
	{
		id: 1,
		user: "Sarah M.",
		rating: 5,
		date: "2 days ago",
		comment:
			"Perfect fit for my 8-year-old! The material is soft and comfortable. Great quality for the price.",
		verified: true,
	},
	{
		id: 2,
		user: "Mike R.",
		rating: 4,
		date: "1 week ago",
		comment:
			"Good quality trousers. My son loves wearing them. The tapered fit looks modern and stylish.",
		verified: true,
	},
	{
		id: 3,
		user: "Emma L.",
		rating: 5,
		date: "2 weeks ago",
		comment:
			"Excellent value for money. The fabric is durable and has maintained its shape after multiple washes.",
		verified: false,
	},
];

const mockRelatedProducts = [
	{
		_id: "1",
		name: "Kids Cotton T-Shirt",
		price: 120,
		originalPrice: 150,
		images: ["http://localhost:5000/images/products/p_img1.png"],
		rating: 4.2,
		bestseller: false,
	},
	{
		_id: "2",
		name: "Kids Denim Jacket",
		price: 450,
		originalPrice: 550,
		images: ["http://localhost:5000/images/products/p_img2.png"],
		rating: 4.7,
		bestseller: true,
	},
	{
		_id: "3",
		name: "Kids Sneakers",
		price: 380,
		originalPrice: 420,
		images: ["http://localhost:5000/images/products/p_img3.png"],
		rating: 4.4,
		bestseller: false,
	},
	{
		_id: "4",
		name: "Kids Casual Shorts",
		price: 190,
		originalPrice: 230,
		images: ["http://localhost:5000/images/products/p_img4.png"],
		rating: 4.1,
		bestseller: false,
	},
];

const constants = {
	menu,
	mockProduct,
	mockRelatedProducts,
	mockReviews,
	tax: 9.99,
	discount: 50,
	shipping: 5,
};

export default constants;
