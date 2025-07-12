import React, { useState } from "react";
import { ShoppingBag, Heart, X } from "lucide-react";
import {
	FlexContainer,
	GridContainer,
} from "@/components/layouts/containers/Container";
import Card from "@/components/common/Card";
import { TextBody } from "@/components/common/typography/Text";
import { StarRating } from "@/components/common/Input";
import { H3, H4, H6 } from "@/components/common/typography/Headings";
import Button from "@/components/common/Buttons";
import { ProductImage } from "@/components/common/ImageUtil";
import {
	FloatingBadge,
	StatusBadge,
} from "@/components/common/typography/Badge";
import { useNavigate } from "react-router";

const QuickViewModal = ({ isOpen, onClose, product }) => {
	const navigate = useNavigate();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isWishlisted, setIsWishlisted] = useState(false);

	if (!isOpen) return null;

	const images = product.images || [product.mainImage];
	const discountPercentage = product.originalPrice
		? Math.round(
				((product.originalPrice - product.price) / product.originalPrice) * 100
		  )
		: product.discount || 0;

	return (
		<FlexContainer className="fixed inset-0 bg-black/50 z-50 p-4">
			<Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<FlexContainer
					justify="between"
					className="sticky top-0 bg-base-100 p-4 border-b border-base-300 justify-between"
				>
					<H4>Quick View</H4>
					<Button variant="icon" action={onClose} className="btn-sm">
						<X className="w-5 h-5" />
					</Button>
				</FlexContainer>

				<div className="p-6">
					<GridContainer columns="two">
						{/* Image Section */}
						<div className="space-y-4">
							<div className="relative">
								<ProductImage
									height="h-96"
									src={images[currentImageIndex]}
									alt={product.name}
								/>
								{discountPercentage > 0 && (
									<FloatingBadge size="xs" className="top-3 right-3">
										{discountPercentage}% OFF
									</FloatingBadge>
								)}
								<Button
									variant="icon"
									action={() => setIsWishlisted(!isWishlisted)}
									className={`absolute top-3 left-3 bg-base-100/80 ${
										isWishlisted ? "text-error" : "hover:text-error/70"
									}`}
								>
									<Heart
										className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
									/>
								</Button>
							</div>

							{images.length > 1 && (
								<div className="flex gap-2 overflow-x-auto pb-2">
									{images.map((image, index) => (
										<button
											key={index}
											onClick={() => setCurrentImageIndex(index)}
											className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
												currentImageIndex === index
													? "border-primary"
													: "border-base-300"
											}`}
										>
											<img
												src={image}
												alt={`${product.name} ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Product Info Section */}
						<div className="space-y-4">
							<FlexContainer justify="start">
								<StatusBadge type="secondary">{product.category}</StatusBadge>
							</FlexContainer>

							<H3>{product.name}</H3>

							<FlexContainer justify="start" className="gap-2">
								<StarRating
									rating={Math.floor(product.rating || 4.8)}
									maxRating={5}
								/>
								<TextBody variant="small">
									({product.reviews || "25"} reviews)
								</TextBody>
								{product.rating && (
									<TextBody variant="small" className="text-neutral/70">
										{product.rating}
									</TextBody>
								)}
							</FlexContainer>

							<FlexContainer justify="start" className="gap-3">
								<H3>${product.price}</H3>
								{product.originalPrice && (
									<TextBody variant="large" className="line-through">
										${product.originalPrice}
									</TextBody>
								)}
							</FlexContainer>

							{product.description && (
								<div>
									<H6 className="mb-2">Description</H6>
									<TextBody className="leading-relaxed">
										{product.description}
									</TextBody>
								</div>
							)}

							{product.sizes && product.sizes.length > 0 && (
								<div>
									<H6 className="mb-2">Available Sizes</H6>
									<div className="flex gap-2 flex-wrap">
										{product.sizes.map((size) => (
											<TextBody
												variant="label"
												key={size}
												className="px-3 py-1 bg-base-200 rounded-full"
											>
												{size}
											</TextBody>
										))}
									</div>
								</div>
							)}

							<div className="pt-4 space-y-3">
								<Button
									variant="outline"
									className="btn-block btn-md"
									action={() => navigate(`/products/${product.id}`)}
								>
									View Full Details
								</Button>
							</div>
						</div>
					</GridContainer>
				</div>
			</Card>
		</FlexContainer>
	);
};

export default QuickViewModal;
