import { useCart } from "@/app/hooks/useCart";
import Button from "@/components/common/Buttons";
import { H5 } from "@/components/common/typography/Headings";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { ChevronRight, Minus, Package, Plus, ShoppingBag } from "lucide-react";
import React, { useState } from "react";

const ProductsActionButtons = ({ product }) => {
	const { addToCart } = useCart();
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();

		// Add directly to cart with default values
		addToCart({ productId: product.id, size: selectedSize, quantity });
	};
	return (
		<>
			<div className="space-y-3">
				<FlexContainer justify="between">
					<H5>Select Size</H5>
					<button className="btn btn-link">Size Guide</button>
				</FlexContainer>
				<div className="flex gap-3">
					{product.sizes.map((size) => (
						<Button
							key={size}
							variant="sizeBtn"
							action={() => setSelectedSize(size)}
							condition={selectedSize === size}
						>
							{size}
						</Button>
					))}
				</div>
			</div>
			<div className="space-y-4">
				<FlexContainer justify="start" className="gap-4">
					<FlexContainer
						justify="start"
						className="border border-base-300 rounded-xl bg-base-100"
					>
						<Button
							variant="number-l"
							action={() => setQuantity(Math.max(1, quantity - 1))}
							className="p-3"
						>
							<Minus className="w-4 h-4" />
						</Button>
						<span className="px-4 py-3 font-semibold min-w-[60px] text-center">
							{quantity}
						</span>
						<Button
							variant="number-r"
							action={() => setQuantity(quantity + 1)}
							className="p-3"
						>
							<Plus className="w-4 h-4" />
						</Button>
					</FlexContainer>
					<Button className="flex-1 group" action={handleAddToCart}>
						<ShoppingBag className="w-5 h-5 mr-2" />
						Add to Cart
						<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
				</FlexContainer>

				<Button variant="secondary" className="w-full">
					<Package className="w-5 h-5 mr-2" />
					Buy Now
				</Button>
			</div>
		</>
	);
};

export default ProductsActionButtons;
