import React, { useState } from "react";
import { ShoppingBag, Heart, Eye, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Card, { CardContent } from "../common/Card";
import { HoverImage, ImageOverlay } from "../common/ImageUtil";
import { FloatingBadge, StatusBadge } from "../common/typography/Badge";
import Button from "../common/Buttons";
import { FlexContainer } from "../layouts/containers/Container";
import { TextBody } from "../common/typography/Text";
import { H3, H6 } from "../common/typography/Headings";
import { StarRating } from "../common/Input";

const ProductCard = ({ product, showQuickActions = true }) => {
	const navigate = useNavigate();

	const [isHovered, setIsHovered] = useState(false);

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// Add to cart functionality
		console.log("Add to cart:", product);
		navigate(`/product/${product.id}`);
	};

	return (
		<div
			className="group cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link to={`/products/${product.id}`}>
				<Card variant="product" className="h-full">
					{/* Product Image Container */}
					<ProductImage
						product={product}
						showQuickActions={showQuickActions}
						isHovered={isHovered}
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
										{index < Math.min(product.sizes.length - 1, 3) ? ", " : ""}
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
			</Link>
		</div>
	);
};

const ProductImage = ({ product, showQuickActions, isHovered }) => {
	const [isWishListed, setIsWishListed] = useState(false);
	const handleWishlistToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsWishListed(!isWishListed);
	};

	const handleQuickView = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// Quick view functionality
		console.log("Quick view:", product.name);
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
				src={product.image?.[0] || product.mainImage}
				alt={product.name}
				className="w-full h-64 object-cover group-hover:scale-110"
				loading="lazy"
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
						action={handleQuickView}
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

export default ProductCard;
