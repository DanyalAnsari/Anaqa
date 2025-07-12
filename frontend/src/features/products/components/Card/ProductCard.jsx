import React, { useState } from "react";
import { ShoppingBag, Heart, Eye, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Card, { CardContent, CardImage } from "@/components/common/Card";
import { ImageOverlay } from "@/components/common/ImageUtil";
import {
	FloatingBadge,
	StatusBadge,
} from "@/components/common/typography/Badge";
import Button from "@/components/common/Buttons";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { TextBody } from "@/components/common/typography/Text";
import { H3, H6 } from "@/components/common/typography/Headings";
import { StarRating } from "@/components/common/Input";
import { useCart } from "@/app/hooks/useCart";
import SizeSelectionModal from "@/features/products/components/Card/SizeSelectionModal";
import QuickViewModal from "@/features/products/components/Card/QuickViewModal";

const ProductCard = ({ product, showQuickActions = true }) => {
	const { addToCart } = useCart();
	const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);
	const [showSizeModal, setShowSizeModal] = useState(false);
	const [showQuickView, setShowQuickView] = useState(false);

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (product.sizes && product.sizes.length > 1) {
			setShowSizeModal(true);
		} else if (product.sizes && product.sizes.length == 1) {
			// Add directly to cart with default values
			addToCart({ productId: product.id, size: product.sizes[0], quantity: 1 });
		}
	};

	const handleQuickView = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowQuickView(true);
	};

	const handleSizeModalAddToCart = (item) => {
		console.log(item);
		
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
				<Link to={`/products/${product.id}`}>
					<Card variant="product" className="h-full">
						{/* Product Image Container */}
						<ProductImage
							product={product}
							showQuickActions={showQuickActions}
							isHovered={isHovered}
							onQuickView={handleQuickView}
						/>

						{/* Product Info */}
						<CardContent padding="small" className="space-y-3">
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
								<FlexContainer justify="start" className="gap-2">
									<H3>${product.price}</H3>
									{product.originalPrice && (
										<TextBody variant="small" className="line-through">
											${product.originalPrice}
										</TextBody>
									)}
								</FlexContainer>

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
								<FlexContainer
									align="end"
									justify="center"
									className="gap-1 w-fit pt-1"
								>
									<TextBody variant="small">Sizes:</TextBody>
									{product.sizes.slice(0, 4).map((size, index) => (
										<TextBody variant="caption" key={size}>
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
								action={() => navigate(`/products/${product.id}`)}
							>
								<ShoppingBag className="w-4 h-4 mr-2" />
								View Product
							</Button>
						</CardContent>
					</Card>
				</Link>
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
		<CardImage
			className="bg-base-200"
			src={product.images?.[0] || product.mainImage}
			alt={product.name}
			imageClass="h-64"
		>
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
		</CardImage>
	);
};

export default ProductCard;
