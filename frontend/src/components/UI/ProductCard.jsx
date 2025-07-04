import React, { useState } from "react";
import { ShoppingBag, Heart, Eye, Star, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Card, { CardContent } from "../common/Card";

const ProductCard = ({
	product,
	variant = "default",
	showQuickActions = true,
}) => {
	const navigate = useNavigate();
	const [isWishlisted, setIsWishlisted] = useState(false);

	const [isHovered, setIsHovered] = useState(false);

	const handleWishlistToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsWishlisted(!isWishlisted);
	};

	const handleQuickView = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// Quick view functionality
		console.log("Quick view:", product.name);
	};

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// Add to cart functionality
		console.log("Add to cart:", product);
		navigate(`/product/${product.id}`);
	};

	// Calculate discount percentage if originalPrice exists
	const discountPercentage = product.originalPrice
		? Math.round(
				((product.originalPrice - product.price) / product.originalPrice) * 100
		  )
		: product.discount || 0;

	return (
		<div
			className="group cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link to={`/products/${product.id}`}>
				<Card variant="product" className="h-full">
					{/* Product Image Container */}
					<div className="relative overflow-hidden bg-base-200">
						<img
							src={product.image?.[0] || product.mainImage}
							alt={product.name}
							className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>

						{/* Discount Badge */}
						{discountPercentage > 0 && (
							<div className="absolute top-3 right-3 z-20 bg-accent text-accent-content px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
								{discountPercentage}% OFF
							</div>
						)}

						{/* Wishlist Button */}
						{showQuickActions && (
							<button
								className={`absolute top-3 left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
									isHovered ? "opacity-100" : "opacity-0"
								} ${
									isWishlisted
										? "bg-error text-error-content shadow-lg scale-110"
										: "bg-base-100/80 text-neutral hover:bg-error hover:text-error-content hover:scale-110"
								}`}
								onClick={handleWishlistToggle}
								title={
									isWishlisted ? "Remove from wishlist" : "Add to wishlist"
								}
							>
								<Heart
									className={`w-5 h-5 transition-all duration-300 ${
										isWishlisted ? "fill-current" : ""
									}`}
								/>
							</button>
						)}

						{/* Hover Overlay with Quick View */}
						{showQuickActions && (
							<div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
								<button
									className="btn btn-primary btn-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
									onClick={handleQuickView}
								>
									<Eye className="w-4 h-4" />
									Quick View
								</button>
							</div>
						)}

						{/* New Badge */}
						{product.isNew && (
							<div className="absolute top-3 left-3 z-10 bg-success text-success-content px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
								NEW
							</div>
						)}
					</div>

					{/* Product Info */}
					<CardContent
						padding="small"
						className="space-y-3 flex-1 flex flex-col"
					>
						{/* Category and Brand */}
						<div className="flex items-center justify-between">
							<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium border border-secondary/20">
								{product.category}
							</span>
							{product.brand && (
								<span className="text-xs text-neutral font-medium">
									{product.brand}
								</span>
							)}
						</div>

						{/* Product Name */}
						<h3 className="font-semibold text-primary line-clamp-2 leading-tight text-base group-hover:text-primary/80 transition-colors">
							{product.name}
						</h3>

						{/* Rating and Reviews */}
						<div className="flex items-center gap-1">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-4 h-4 ${
											i < Math.floor(product.rating || 4.8)
												? "text-warning fill-current"
												: "text-base-300"
										}`}
									/>
								))}
							</div>
							<span className="text-sm text-neutral ml-1">
								({product.reviews || "25"})
							</span>
							{product.rating && (
								<span className="text-sm font-medium text-neutral">
									{product.rating}
								</span>
							)}
						</div>

						{/* Price Section */}
						<div className="flex items-center justify-between pt-2">
							<div className="flex items-center gap-2">
								<span className="text-2xl font-bold text-primary">
									${product.price}
								</span>
								{product.originalPrice && (
									<span className="text-sm text-neutral line-through">
										${product.originalPrice}
									</span>
								)}
							</div>

							{/* Quick Add Button */}
							<button
								className="btn btn-outline btn-primary btn-sm hover:btn-primary group/btn transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
								onClick={handleAddToCart}
								title="Quick add to cart"
							>
								<Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
							</button>
						</div>

						{/* Size Options Preview */}
						{product.sizes && product.sizes.length > 0 && (
							<div className="flex items-center gap-1 pt-1">
								<span className="text-xs text-neutral">Sizes:</span>
								{product.sizes.slice(0, 4).map((size, index) => (
									<span key={size} className="text-xs text-neutral">
										{size}
										{index < Math.min(product.sizes.length - 1, 3) ? ", " : ""}
									</span>
								))}
								{product.sizes.length > 4 && (
									<span className="text-xs text-neutral">
										+{product.sizes.length - 4}
									</span>
								)}
							</div>
						)}

						{/* Full Width Add to Cart Button */}
						<button
							className="w-full btn btn-primary btn-sm mt-auto opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100"
							onClick={handleAddToCart}
						>
							<ShoppingBag className="w-4 h-4 mr-2" />
							Add to Cart
						</button>
					</CardContent>
				</Card>
			</Link>
		</div>
	);
};

export default ProductCard;
