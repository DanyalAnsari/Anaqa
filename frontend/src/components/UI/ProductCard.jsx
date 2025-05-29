import { ShoppingBag } from "lucide-react";
import React from "react";
import Card, { CardContent, CardTitle } from "../common/Card";

const ProductCard = ({ product }) => {
	return (
		<Card className="group w-full">
			{/* Discount Badge */}
			{
				<div className="badge badge-sm badge-secondary absolute top-2 right-2 z-10">
					{10}% OFF
				</div>
			}

			{/* Product Image */}
			<figure className="relative">
				<img
					src={product.image[0]}
					alt={product.name}
					className="h-full w-full rounded-t-lg object-cover"
				/>
			</figure>

			<CardContent className="p-3">
				<CardTitle className="line-clamp-1 mb-0">{product.name}</CardTitle>

				<div className="w-full flex justify-between items-center gap-2 px-2 mt-1">
					<div className="text-xs text-base-content/60">
						<p>{product.category}</p>
						<p>{product.subCategory}</p>
					</div>

					{/* Price */}

					<span className="text-primary font-semibold">${product.price}</span>
				</div>

				{/* Quick add button - shows on hover */}
				<div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						className="btn btn-sm btn-outline btn-primary gap-1"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							// Add to cart functionality can be added here
						}}
					>
						<ShoppingBag size={14} />
						Add to Cart
					</button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
