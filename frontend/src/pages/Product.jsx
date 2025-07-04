import { useEffect, useState } from "react";
import {
	ShoppingBag,
	Heart,
	Star,
	Plus,
	Minus,
	Share2,
	Truck,
	Shield,
	RefreshCw,
	ArrowLeft,
	ChevronRight,
	Eye,
	ArrowRight,
	Clock,
	Users,
	MessageSquare,
	TrendingUp,
	Zap,
	CheckCircle,
	Package,
	Gauge,
	ThumbsUp,
} from "lucide-react";
import { useParams } from "react-router";
import { useGetProductQuery } from "@/features/products/productsApi";

// Mock data based on your API structure
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

const Product = () => {
	const [selectedImage, setSelectedImage] = useState(0);
	const [product, setProduct] = useState(mockProduct);
	const { id } = useParams();
	const {isLoading, data}=useGetProductQuery(id)

	useEffect(() => {
		console.log(data);
		setProduct(data?.data)
	}, [data]);

	if (isLoading) {
		return <h1>wait</h1>
	}
	return (
		<div className="min-h-screen bg-gradient-to-b from-base-200/30 to-base-100">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Back Button */}
				<button className="btn btn-outline btn-sm mb-8 group border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary">
					<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
					Back to Collection
				</button>

				{/* Main Product Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
					<ProductImageGallery
						images={product.images}
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						discount={product.discount}
						bestseller={product.bestseller}
					/>
					<ProductInfo product={product} />
				</div>

				{/* Product Details Tabs */}
				<div className="mb-20">
					<ProductTabs product={product} reviews={mockReviews} />
				</div>

				{/* Related Products */}
				<RelatedProducts products={mockRelatedProducts} />
			</div>
		</div>
	);
};

const ProductImageGallery = ({
	images,
	selectedImage,
	setSelectedImage,
	discount,
	bestseller,
}) => {
	return (
		<div className="space-y-4">
			{/* Main Image */}
			<div className="relative bg-base-200 rounded-2xl overflow-hidden aspect-square">
				<img
					src={images[selectedImage]}
					alt="Product"
					className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
				/>

				{/* Badges */}
				<div className="absolute top-4 left-4 space-y-2">
					{bestseller && (
						<div className="bg-accent text-accent-content px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
							<TrendingUp className="w-3 h-3" />
							BESTSELLER
						</div>
					)}
					{discount && (
						<div className="bg-error text-error-content px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
							{discount}% OFF
						</div>
					)}
				</div>

				{/* Quick Actions */}
				<div className="absolute top-4 right-4 space-y-2">
					<button className="w-10 h-10 bg-base-100/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-base-100 transition-all duration-300 shadow-lg">
						<Eye className="w-5 h-5 text-neutral" />
					</button>
					<button className="w-10 h-10 bg-base-100/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-base-100 transition-all duration-300 shadow-lg">
						<Share2 className="w-5 h-5 text-neutral" />
					</button>
				</div>
			</div>

			{/* Thumbnail Gallery */}
			<div className="grid grid-cols-4 gap-3">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setSelectedImage(index)}
						className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
							selectedImage === index
								? "border-primary shadow-lg"
								: "border-base-300 hover:border-secondary"
						}`}
					>
						<img
							src={image}
							alt={`Product ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

const ProductInfo = ({ product }) => {
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [selectedSize, setSelectedSize] = useState("");
	const [quantity, setQuantity] = useState(1);

	const discountAmount = product.originalPrice - product.price;
	const discountPercentage = Math.round(
		(discountAmount / product.originalPrice) * 100
	);

	return (
		<div className="space-y-6">
			{/* Breadcrumb */}
			<div className="flex items-center gap-2 text-sm text-neutral">
				<span>Home</span>
				<ChevronRight className="w-4 h-4" />
				<span className="capitalize">{product.category}</span>
				<ChevronRight className="w-4 h-4" />
				<span className="capitalize">{product.subCategory}</span>
				<ChevronRight className="w-4 h-4" />
				<span className="text-primary">{product.name}</span>
			</div>

			{/* Product Title & Actions */}
			<div className="space-y-3">
				<div className="flex items-start justify-between">
					<h1 className="text-2xl lg:text-3xl font-bold text-primary">
						{product.name}
					</h1>
					<button
						onClick={() => setIsWishlisted(!isWishlisted)}
						className={`p-3 rounded-full transition-all duration-300 ${
							isWishlisted
								? "bg-error text-error-content shadow-lg"
								: "bg-base-200 text-neutral hover:bg-base-300"
						}`}
					>
						<Heart
							className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
						/>
					</button>
				</div>

				{/* Rating & Status */}
				<div className="flex items-center gap-4 flex-wrap">
					<div className="flex items-center gap-1">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-4 h-4 ${
									i < Math.floor(product.rating)
										? "text-warning fill-current"
										: "text-base-300"
								}`}
							/>
						))}
						<span className="text-sm text-neutral ml-1">
							({product.reviews} reviews)
						</span>
					</div>
					<span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium border border-success/20">
						{product.stock > 0 ? "In Stock" : "Out of Stock"}
					</span>
					<span className="text-sm text-neutral flex items-center gap-1">
						<Users className="w-4 h-4" />
						{product.sold} sold
					</span>
				</div>
			</div>

			{/* Price */}
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<span className="text-3xl font-bold text-primary">
						${product.price}
					</span>
					{product.originalPrice && (
						<span className="text-lg text-neutral line-through">
							${product.originalPrice}
						</span>
					)}
					{discountPercentage > 0 && (
						<span className="bg-error/10 text-error px-2 py-1 rounded-lg text-sm font-semibold">
							{discountPercentage}% OFF
						</span>
					)}
				</div>
				{discountAmount > 0 && (
					<p className="text-sm text-success">You save ${discountAmount}</p>
				)}
			</div>

			{/* Trust Indicators */}
			<div className="flex items-center gap-6 py-4 border-y border-base-300">
				<div className="flex items-center gap-2">
					<CheckCircle className="w-5 h-5 text-success" />
					<span className="text-sm text-neutral">Verified Product</span>
				</div>
				<div className="flex items-center gap-2">
					<Zap className="w-5 h-5 text-warning" />
					<span className="text-sm text-neutral">Fast Shipping</span>
				</div>
				<div className="flex items-center gap-2">
					<ThumbsUp className="w-5 h-5 text-info" />
					<span className="text-sm text-neutral">High Quality</span>
				</div>
			</div>

			{/* Description */}
			<p className="text-neutral leading-relaxed">{product.description}</p>

			{/* Size Selection */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-primary">Select Size</h3>
					<button className="text-sm text-secondary hover:underline">
						Size Guide
					</button>
				</div>
				<div className="flex gap-3">
					{product.sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all duration-300 ${
								selectedSize === size
									? "border-primary bg-primary text-primary-content shadow-lg"
									: "border-base-300 bg-base-100 text-neutral hover:border-secondary"
							}`}
						>
							{size}
						</button>
					))}
				</div>
			</div>

			{/* Quantity & Add to Cart */}
			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<div className="flex items-center border border-base-300 rounded-xl bg-base-100">
						<button
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							className="p-3 hover:bg-base-200 transition-colors rounded-l-xl"
						>
							<Minus className="w-4 h-4" />
						</button>
						<span className="px-4 py-3 font-semibold min-w-[60px] text-center">
							{quantity}
						</span>
						<button
							onClick={() => setQuantity(quantity + 1)}
							className="p-3 hover:bg-base-200 transition-colors rounded-r-xl"
						>
							<Plus className="w-4 h-4" />
						</button>
					</div>
					<button className="btn btn-primary btn-lg flex-1 group border-0 shadow-lg hover:shadow-xl">
						<ShoppingBag className="w-5 h-5 mr-2" />
						Add to Cart
						<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>

				<button className="btn btn-outline btn-lg w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary">
					<Package className="w-5 h-5 mr-2" />
					Buy Now
				</button>
			</div>

			{/* Stock Alert */}
			{product.stock <= 5 && (
				<div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
					<div className="flex items-center gap-2">
						<Clock className="w-5 h-5 text-warning" />
						<span className="text-warning font-semibold">Limited Stock!</span>
					</div>
					<p className="text-sm text-neutral mt-1">
						Only {product.stock} left in stock
					</p>
				</div>
			)}

			{/* Features */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-base-300">
				<div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl border border-base-300/30">
					<div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
						<Truck className="w-5 h-5 text-info" />
					</div>
					<div>
						<h4 className="font-semibold text-primary">Free Shipping</h4>
						<p className="text-sm text-neutral">On orders over $50</p>
					</div>
				</div>

				<div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl border border-base-300/30">
					<div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
						<Shield className="w-5 h-5 text-success" />
					</div>
					<div>
						<h4 className="font-semibold text-primary">Secure Payment</h4>
						<p className="text-sm text-neutral">100% protected</p>
					</div>
				</div>

				<div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl border border-base-300/30">
					<div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
						<RefreshCw className="w-5 h-5 text-warning" />
					</div>
					<div>
						<h4 className="font-semibold text-primary">Easy Returns</h4>
						<p className="text-sm text-neutral">30-day policy</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProductTabs = ({ product, reviews }) => {
	const [activeTab, setActiveTab] = useState("description");

	return (
		<div className="space-y-6">
			{/* Tab Navigation */}
			<div className="flex gap-1 bg-base-200/50 p-2 rounded-2xl border border-base-300/30">
				{[
					{ id: "description", label: "Description" },
					{ id: "reviews", label: `Reviews (${reviews.length})` },
					{ id: "shipping", label: "Shipping Info" },
					{ id: "care", label: "Care Guide" },
				].map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
							activeTab === tab.id
								? "bg-primary text-primary-content shadow-lg"
								: "text-neutral hover:bg-base-200"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300/50">
				{activeTab === "description" && (
					<div className="space-y-6">
						<h3 className="text-xl font-bold text-primary">
							Product Description
						</h3>
						<p className="text-neutral leading-relaxed">
							{product.description}
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h4 className="font-semibold text-primary mb-3">Features</h4>
								<ul className="text-neutral space-y-2">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Premium quality fabric
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Comfortable fit
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Durable construction
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Easy to maintain
									</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold text-primary mb-3">
									Specifications
								</h4>
								<ul className="text-neutral space-y-2">
									<li>
										<strong>Material:</strong> Cotton blend
									</li>
									<li>
										<strong>Fit:</strong> Slim tapered
									</li>
									<li>
										<strong>Care:</strong> Machine washable
									</li>
									<li>
										<strong>Origin:</strong> Made in India
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}

				{activeTab === "reviews" && (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold text-primary">
								Customer Reviews
							</h3>
							<button className="btn btn-outline btn-sm border-secondary text-secondary hover:bg-secondary hover:text-secondary-content">
								<MessageSquare className="w-4 h-4 mr-2" />
								Write Review
							</button>
						</div>

						{/* Review Summary */}
						<div className="bg-base-200/50 rounded-xl p-6 border border-base-300/30">
							<div className="flex items-center gap-4">
								<div className="text-center">
									<div className="text-3xl font-bold text-primary">
										{product.rating}
									</div>
									<div className="flex items-center gap-1 justify-center">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${
													i < Math.floor(product.rating)
														? "text-warning fill-current"
														: "text-base-300"
												}`}
											/>
										))}
									</div>
									<div className="text-sm text-neutral">
										{product.reviews} reviews
									</div>
								</div>
								<div className="flex-1">
									<div className="space-y-2">
										{[5, 4, 3, 2, 1].map((stars) => (
											<div key={stars} className="flex items-center gap-2">
												<span className="text-sm text-neutral w-4">
													{stars}
												</span>
												<Star className="w-3 h-3 text-warning" />
												<div className="flex-1 bg-base-300 rounded-full h-2">
													<div
														className="bg-warning h-2 rounded-full"
														style={{ width: `${Math.random() * 100}%` }}
													></div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Individual Reviews */}
						<div className="space-y-4">
							{reviews.map((review) => (
								<div
									key={review.id}
									className="p-6 bg-base-200/50 rounded-xl border border-base-300/30"
								>
									<div className="flex items-center justify-between mb-3">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
												<span className="text-primary font-semibold">
													{review.user.charAt(0)}
												</span>
											</div>
											<div>
												<div className="flex items-center gap-2">
													<span className="font-semibold text-primary">
														{review.user}
													</span>
													{review.verified && (
														<CheckCircle className="w-4 h-4 text-success" />
													)}
												</div>
												<div className="flex items-center gap-1">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-3 h-3 ${
																i < review.rating
																	? "text-warning fill-current"
																	: "text-base-300"
															}`}
														/>
													))}
												</div>
											</div>
										</div>
										<span className="text-sm text-neutral">{review.date}</span>
									</div>
									<p className="text-neutral leading-relaxed">
										{review.comment}
									</p>
								</div>
							))}
						</div>
					</div>
				)}

				{activeTab === "shipping" && (
					<div className="space-y-6">
						<h3 className="text-xl font-bold text-primary">
							Shipping Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div className="p-4 bg-base-200/50 rounded-xl border border-base-300/30">
									<div className="flex items-center gap-3 mb-2">
										<Truck className="w-5 h-5 text-info" />
										<h4 className="font-semibold text-primary">
											Standard Shipping
										</h4>
									</div>
									<p className="text-neutral">5-7 business days</p>
									<p className="text-sm text-neutral">
										Free on orders over $50
									</p>
								</div>
								<div className="p-4 bg-base-200/50 rounded-xl border border-base-300/30">
									<div className="flex items-center gap-3 mb-2">
										<Zap className="w-5 h-5 text-warning" />
										<h4 className="font-semibold text-primary">
											Express Shipping
										</h4>
									</div>
									<p className="text-neutral">2-3 business days</p>
									<p className="text-sm text-neutral">$9.99</p>
								</div>
							</div>
							<div className="space-y-4">
								<div className="p-4 bg-base-200/50 rounded-xl border border-base-300/30">
									<div className="flex items-center gap-3 mb-2">
										<Gauge className="w-5 h-5 text-error" />
										<h4 className="font-semibold text-primary">
											Next Day Delivery
										</h4>
									</div>
									<p className="text-neutral">1 business day</p>
									<p className="text-sm text-neutral">$19.99 (select areas)</p>
								</div>
								<div className="p-4 bg-base-200/50 rounded-xl border border-base-300/30">
									<div className="flex items-center gap-3 mb-2">
										<Package className="w-5 h-5 text-success" />
										<h4 className="font-semibold text-primary">Store Pickup</h4>
									</div>
									<p className="text-neutral">Ready in 2-4 hours</p>
									<p className="text-sm text-neutral">Free</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeTab === "care" && (
					<div className="space-y-6">
						<h3 className="text-xl font-bold text-primary">
							Care Instructions
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h4 className="font-semibold text-primary mb-3">Washing</h4>
								<ul className="text-neutral space-y-2">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Machine wash in cold water
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Use mild detergent
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Wash similar colors together
									</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold text-primary mb-3">
									Drying & Storage
								</h4>
								<ul className="text-neutral space-y-2">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Tumble dry on low heat
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Iron on medium heat if needed
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										Store in cool, dry place
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const RelatedProducts = ({ products }) => (
	<div className="space-y-8">
		<div className="text-center">
			<div className="flex items-center justify-center gap-3 mb-4">
				<div className="w-12 h-1 bg-secondary rounded-full"></div>
				<span className="text-secondary font-medium text-sm tracking-wider uppercase">
					SIMILAR ITEMS
				</span>
				<div className="w-12 h-1 bg-secondary rounded-full"></div>
			</div>
			<h2 className="text-2xl lg:text-3xl font-bold text-primary">
				You Might Also Like
			</h2>
		</div>

		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{products.map((product) => (
				<div key={product._id} className="group cursor-pointer">
					<div className="bg-base-100 rounded-2xl shadow-lg border border-base-300/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl overflow-hidden">
						<div className="relative overflow-hidden bg-base-200 aspect-square">
							<img
								src={product.images[0]}
								alt={product.name}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>

							{/* Badges */}
							<div className="absolute top-3 left-3">
								{product.bestseller && (
									<div className="bg-accent text-accent-content px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
										BESTSELLER
									</div>
								)}
								{product.originalPrice && (
									<div className="bg-error text-error-content px-2 py-1 rounded-lg text-xs font-semibold shadow-lg mt-1">
										{Math.round(
											((product.originalPrice - product.price) /
												product.originalPrice) *
												100
										)}
										% OFF
									</div>
								)}
							</div>

							<button className="absolute top-3 right-3 w-8 h-8 bg-base-100/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-error hover:text-error-content">
								<Heart className="w-4 h-4" />
							</button>
						</div>

						<div className="p-4 space-y-3">
							<h3 className="font-semibold text-primary line-clamp-2 group-hover:text-secondary transition-colors">
								{product.name}
							</h3>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="text-lg font-bold text-primary">
										${product.price}
									</span>
									{product.originalPrice && (
										<span className="text-sm text-neutral line-through">
											${product.originalPrice}
										</span>
									)}
								</div>
								<div className="flex items-center gap-1">
									<Star className="w-3 h-3 text-warning fill-current" />
									<span className="text-xs text-neutral">{product.rating}</span>
								</div>
							</div>
							<button className="w-full btn btn-outline btn-primary btn-sm hover:btn-primary group">
								<ShoppingBag className="w-4 h-4 mr-2" />
								Add to Cart
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default Product;
