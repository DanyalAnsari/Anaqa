import Button from "@/components/common/Buttons";
import { Breadcrumb, StarRatingInput } from "@/components/common/Input";
import { StatusBadge } from "@/components/common/typography/Badge";
import { H3 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import {
	FlexContainer,
	HoverIconContainer,
} from "@/components/layouts/containers/Container";
import Features from "@/components/UI/Product/Features";
import { CheckCircle, Clock, Heart, ThumbsUp, Users, Zap } from "lucide-react";
import React, { useState } from "react";
import ProductsActionButtons from "./ProductsActionButtons";

const ProductInfo = ({ product }) => {
	const [isWishListed, setIsWishListed] = useState(false);
	const discountAmount = product.originalPrice - product.price || 100;
	const discountPercentage =
		Math.round((discountAmount / product.originalPrice) * 100) || 50;

	return (
		<div className="space-y-6">
			<Breadcrumb
				items={[
					{ label: "Home", href: "/" },
					{ label: product.category, href: "/products" },
					{ label: product.subCategory, href: "/products" },
					{ label: product.name },
				]}
			/>

			{/* Product Title & Actions */}
			<div className="space-y-3">
				<FlexContainer align="start" justify="between">
					<H3>{product.name}</H3>
					<Button
						variant="icon"
						action={() => setIsWishListed(!isWishListed)}
						className={`w-12 h-12 bg-base-200 ${
							isWishListed ? "text-error" : "text-neutral hover:bg-base-300"
						}`}
					>
						<Heart className={`w-6 h-6 ${isWishListed ? "fill-error" : ""}`} />
					</Button>
				</FlexContainer>

				{/* Rating & Status */}
				<div className="flex items-center gap-4 flex-wrap">
					<StarRatingInput
						maxRating={5}
						rating={Math.floor(product.rating) || 4.8}
					/>

					<TextBody variant="caption">
						( {product.reviews || 25} reviews )
					</TextBody>

					<StatusBadge type="success" className="badge-lg">
						{product.stock > 0 ? "In Stock" : "Out of Stock"}
					</StatusBadge>
					<TextBody variant="small" className="flex items-center gap-1">
						<Users className="w-4 h-4" />
						{product.sold} sold
					</TextBody>
				</div>
			</div>

			{/* Price */}
			<div className="space-y-2">
				<FlexContainer justify="start" className="gap-3">
					<H3>${product.price}</H3>
					{product.originalPrice && (
						<TextBody variant="large" className="line-through">
							${product.originalPrice}
						</TextBody>
					)}
					{discountPercentage > 0 && (
						<StatusBadge type="error">{discountPercentage}% OFF</StatusBadge>
					)}
				</FlexContainer>
				{discountAmount > 0 && (
					<TextBody className="text-success">
						You save ${discountAmount} 🎉
					</TextBody>
				)}
			</div>

			{/* Trust Indicators */}
			<FlexContainer
				justify="start"
				className="gap-6 py-4 border-y border-base-300"
			>
				{[
					{
						icon: CheckCircle,
						color: "text-success",
						label: "Verified Product",
					},
					{ icon: Zap, color: "text-warning", label: "Fast Shipping" },
					{ icon: ThumbsUp, color: "text-secondary", label: "High Quality" },
				].map((item) => (
					<div key={item.label} className="flex items-center gap-2">
						<item.icon className={`w-5 h-5 ${item.color}`} />
						<TextBody variant="small">{item.label}</TextBody>
					</div>
				))}
			</FlexContainer>

			{/* Description */}
			<TextBody className="leading-relaxed">{product.description}</TextBody>

			{/* Quantity & Add to Cart */}
			<ProductsActionButtons product={product} />

			{/* Stock Alert */}
			{product.stock <= 5 && (
				<HoverIconContainer className="bg-warning/10 border-warning/20 p-4">
					<FlexContainer className="gap-2">
						<Clock className="w-5 h-5 text-warning" />
						<span className="text-warning font-semibold">Limited Stock!</span>
					</FlexContainer>
					<TextBody variant="small" className="mt-1">
						Only {product.stock} left in stock
					</TextBody>
				</HoverIconContainer>
			)}

			{/* Features */}
			<Features />
		</div>
	);
};

export default ProductInfo;
