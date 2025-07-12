import React, { useState } from "react";
import { ShoppingBag, X, Star } from "lucide-react";
import { FlexContainer } from "@/components/layouts/containers/Container";
import Card from "@/components/common/Card";
import { H3, H4, H6 } from "@/components/common/typography/Headings";
import Button from "@/components/common/Buttons";
import { TextBody } from "@/components/common/typography/Text";
import { ProductImage } from "@/components/common/ImageUtil";

const SizeSelectionModal = ({ isOpen, onClose, product, onAddToCart }) => {
	const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = () => {
		console.log(product.id);

		if (selectedSize) {
			onAddToCart({ productId: product.id, size: selectedSize, quantity });
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<FlexContainer className="fixed inset-0 bg-black/50 z-50 p-4">
			<Card className="p-6 max-w-md w-full">
				<FlexContainer justify="between" className="mb-4">
					<H4>Select Size</H4>
					<Button variant="icon" action={onClose} className="btn-xs">
						<X className="w-4 h-4" />
					</Button>
				</FlexContainer>

				<div className="mb-4">
					<ProductImage
						height="h-32"
						src={product.images?.[0] || product.mainImage}
						alt={product.name}
						className="mb-3"
					/>
					<H6 className="mb-2">{product.name}</H6>
					<FlexContainer justify="start" className="gap-2">
						<H3>${product.price}</H3>
						{product.originalPrice && (
							<TextBody
								variant="small"
								className="line-through text-neutral/60"
							>
								${product.originalPrice}
							</TextBody>
						)}
					</FlexContainer>
				</div>

				<div className="mb-4">
					<TextBody variant="label" className="mb-2">
						Size
					</TextBody>
					<div className="grid grid-cols-4 gap-2">
						{product.sizes?.map((size) => (
							<button
								key={size}
								onClick={() => setSelectedSize(size)}
								className={`btn btn-sm ${
									selectedSize === size ? "btn-primary" : "btn-outline"
								}`}
							>
								{size}
							</button>
						))}
					</div>
				</div>

				<div className="mb-6">
					<TextBody variant="label" className="mb-2">
						Quantity
					</TextBody>
					<div className="flex items-center gap-2">
						<Button
							variant="icon"
							action={() => setQuantity(Math.max(1, quantity - 1))}
							className="btn-sm btn-outline"
						>
							-
						</Button>
						<TextBody variant="label" className="w-10 text-center">
							{quantity}
						</TextBody>
						<Button
							variant="icon"
							action={() => setQuantity(quantity + 1)}
							className="btn-sm btn-outline"
						>
							+
						</Button>
					</div>
				</div>

				<div className="flex gap-3">
					<button onClick={onClose} className="btn btn-outline flex-1">
						Cancel
					</button>
					<button
						onClick={handleAddToCart}
						disabled={!selectedSize}
						className="btn btn-primary flex-1 disabled:opacity-50"
					>
						<ShoppingBag className="w-4 h-4 mr-2" />
						Add to Cart
					</button>
				</div>
			</Card>
		</FlexContainer>
	);
};

export default SizeSelectionModal;
