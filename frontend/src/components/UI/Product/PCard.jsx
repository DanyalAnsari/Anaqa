import React, { useState } from "react";
import { ShoppingBag, Heart, Eye, Plus, X, Star } from "lucide-react";
import QuickViewModal from "@/features/products/components/Card/QuickViewModal";
import SizeSelectionModal from "@/features/products/components/Card/SizeSelectionModal";

// Mock components to match your design system
const Card = ({ children, className }) => (
	<div
		className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
	>
		{children}
	</div>
);

const CardContent = ({ children, padding, className }) => (
	<div
		className={`card-body ${padding === "small" ? "p-4" : "p-6"} ${className}`}
	>
		{children}
	</div>
);

const Button = ({
	children,
	variant,
	animated,
	className,
	action,
	title,
	...props
}) => (
	<button
		className={`btn ${variant === "small" ? "btn-sm" : ""} ${className} ${
			animated ? "transition-all duration-300" : ""
		}`}
		onClick={action}
		title={title}
		{...props}
	>
		{children}
	</button>
);

const HoverImage = ({ src, alt, className }) => (
	<img
		src={src}
		alt={alt}
		className={`w-full object-cover transition-transform duration-500 ${className}`}
	/>
);

const ImageOverlay = ({ children, className }) => (
	<div
		className={`absolute inset-0 bg-gradient-to-t from-base-content/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
	>
		{children}
	</div>
);

const FloatingBadge = ({ children, size, variant, className }) => (
	<div
		className={`absolute z-20 badge ${
			variant === "success" ? "badge-success" : "badge-accent"
		} ${size === "xs" ? "badge-xs" : ""} ${className}`}
	>
		{children}
	</div>
);

const StatusBadge = ({ children, type }) => (
	<div
		className={`badge ${
			type === "secondary" ? "badge-secondary" : "badge-primary"
		} badge-sm`}
	>
		{children}
	</div>
);

const FlexContainer = ({ children, justify, className }) => (
	<div
		className={`flex ${
			justify === "between"
				? "justify-between"
				: justify === "start"
				? "justify-start"
				: "justify-center"
		} items-center ${className}`}
	>
		{children}
	</div>
);

const TextBody = ({ children, variant, className }) => (
	<span
		className={`${
			variant === "caption"
				? "text-xs"
				: variant === "small"
				? "text-sm"
				: "text-base"
		} text-neutral ${className}`}
	>
		{children}
	</span>
);

const H3 = ({ children, className }) => (
	<h3 className={`text-2xl font-bold text-primary ${className}`}>{children}</h3>
);

const H6 = ({ children, className }) => (
	<h6 className={`text-base font-semibold text-primary ${className}`}>
		{children}
	</h6>
);

const StarRating = ({ rating, maxRating, size }) => (
	<div className="flex items-center gap-1">
		{[...Array(maxRating)].map((_, i) => (
			<Star
				key={i}
				className={`${size === "xs" ? "w-3 h-3" : "w-4 h-4"} ${
					i < rating ? "fill-warning text-warning" : "text-base-300"
				}`}
			/>
		))}
	</div>
);


const ProductCard = ({ product, showQuickActions = true }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [showSizeModal, setShowSizeModal] = useState(false);
	const [showQuickView, setShowQuickView] = useState(false);

	// Mock cart function
	const addToCart = (item) => {
		console.log("Added to cart:", item);
		// You would integrate with your actual cart context here
	};

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();

		// If product has sizes, show size selection modal
		if (product.sizes && product.sizes.length > 0) {
			setShowSizeModal(true);
		} else {
			// Add directly to cart with default values
			addToCart({ productID: product.id, size: null, quantity: 1 });
		}
	};

	const handleQuickView = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowQuickView(true);
	};

	const handleSizeModalAddToCart = (item) => {
		addToCart(item);
		setShowSizeModal(false);
	};

	return (
		<>
			<div
				className="group cursor-pointer"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div onClick={() => console.log("Navigate to product")}>
					<Card variant="product" className="h-full">
						{/* Product Image Container */}
						<ProductImage
							product={product}
							showQuickActions={showQuickActions}
							isHovered={isHovered}
							onQuickView={handleQuickView}
						/>

						{/* Product Info */}
						<CardContent
							padding="small"
							className="space-y-3 flex-1 flex flex-col"
						>
							{/* Category and Brand */}
							<FlexContainer justify="between">
								<StatusBadge type="secondary">{product.category}</StatusBadge>
								{product.brand && (
									<TextBody variant="caption">{product.brand}</TextBody>
								)}
							</FlexContainer>

							{/* Product Name */}
							<H6 className="line-clamp-2 leading-tight group-hover:text-primary/80 transition-colors">
								{product.name}
							</H6>

							{/* Rating and Reviews */}
							<div className="flex items-center gap-1">
								<StarRating
									maxRating={5}
									rating={Math.floor(product.rating || 4.8)}
									size="xs"
								/>
								<TextBody variant="small" className="ml-1">
									({product.reviews || "25"})
								</TextBody>
								{product.rating && (
									<TextBody variant="caption">{product.rating}</TextBody>
								)}
							</div>

							{/* Price Section */}
							<FlexContainer justify="between" className="pt-2">
								<div className="flex items-center gap-2">
									<H3>${product.price}</H3>
									{product.originalPrice && (
										<TextBody variant="small" className="line-through">
											${product.originalPrice}
										</TextBody>
									)}
								</div>

								{/* Quick Add Button */}
								<Button
									variant="small"
									animated={true}
									className="translate-x-2 group-hover:translate-x-0"
									action={handleAddToCart}
									title="Quick add to cart"
								>
									<Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
								</Button>
							</FlexContainer>

							{/* Size Options Preview */}
							{product.sizes && product.sizes.length > 0 && (
								<FlexContainer justify="start" className="gap-1 pt-1">
									<TextBody variant="small">Sizes:</TextBody>
									{product.sizes.slice(0, 4).map((size, index) => (
										<TextBody
											variant="caption"
											key={size}
											className="text-xs text-neutral"
										>
											{size}
											{index < Math.min(product.sizes.length - 1, 3)
												? ", "
												: ""}
										</TextBody>
									))}
								</FlexContainer>
							)}

							{/* Full Width Add to Cart Button */}
							<Button
								animated={true}
								className="w-full btn-sm mt-auto translate-y-2 group-hover:translate-y-0 delay-100"
								action={handleAddToCart}
							>
								<ShoppingBag className="w-4 h-4 mr-2" />
								Add to Cart
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Modals */}
			<SizeSelectionModal
				isOpen={showSizeModal}
				onClose={() => setShowSizeModal(false)}
				product={product}
				onAddToCart={handleSizeModalAddToCart}
			/>

			<QuickViewModal
				isOpen={showQuickView}
				onClose={() => setShowQuickView(false)}
				product={product}
			/>
		</>
	);
};

const ProductImage = ({
	product,
	showQuickActions,
	isHovered,
	onQuickView,
}) => {
	const [isWishListed, setIsWishListed] = useState(false);

	const handleWishlistToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsWishListed(!isWishListed);
	};

	// Calculate discount percentage if originalPrice exists
	const discountPercentage = product.originalPrice
		? Math.round(
				((product.originalPrice - product.price) / product.originalPrice) * 100
		  )
		: product.discount || 0;

	return (
		<div className="relative overflow-hidden bg-base-200">
			<HoverImage
				src={product.images?.[0] || product.mainImage}
				alt={product.name}
				className="h-64 group-hover:scale-110"
			/>

			{/* Discount Badge */}
			{discountPercentage > 0 && (
				<FloatingBadge size="xs" className="top-3 right-3">
					{discountPercentage}% OFF
				</FloatingBadge>
			)}

			{/* Wishlist Button */}
			{showQuickActions && (
				<button
					className={`absolute top-3 left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
						isHovered ? "opacity-100" : "opacity-0"
					} ${
						isWishListed
							? "bg-error text-error-content shadow-lg scale-110"
							: "bg-base-100/80 text-neutral hover:bg-error hover:text-error-content hover:scale-110"
					}`}
					onClick={handleWishlistToggle}
					title={isWishListed ? "Remove from wishlist" : "Add to wishlist"}
				>
					<Heart
						className={`w-5 h-5 transition-all duration-300 ${
							isWishListed ? "fill-current" : ""
						}`}
					/>
				</button>
			)}

			{/* Hover Overlay with Quick View */}
			{showQuickActions && (
				<ImageOverlay
					variant="card"
					className="flex items-center justify-center"
				>
					<Button
						className="btn-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
						action={onQuickView}
					>
						<Eye className="w-4 h-4" />
						Quick View
					</Button>
				</ImageOverlay>
			)}

			{/* New Badge */}
			{product.isNew && (
				<FloatingBadge variant="success" size="xs" className="top-3 left-3">
					NEW
				</FloatingBadge>
			)}
		</div>
	);
};

// Demo component with sample data
const Demo = () => {
	const sampleProduct = {
		id: 1,
		name: "Premium Cotton T-Shirt",
		category: "Clothing",
		brand: "EcoWear",
		price: 29.99,
		originalPrice: 39.99,
		rating: 4.8,
		reviews: 127,
		sizes: ["XS", "S", "M", "L", "XL", "XXL"],
		images: [
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
			"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop",
			"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=300&fit=crop",
		],
		mainImage:
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
		description:
			"Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear with a modern fit that flatters all body types.",
		isNew: true,
	};

	return (
		<div className="p-8 bg-base-200 min-h-screen">
			<div className="max-w-sm mx-auto">
				<ProductCard product={sampleProduct} />
			</div>
		</div>
	);
};

export default Demo;
