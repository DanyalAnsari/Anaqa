import { FloatingBadge } from "@/components/common/typography/Badge";
import { H5 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import React from "react";
import { Minus, Plus, Trash2, Heart, Package } from "lucide-react";
import { FlexContainer } from "@/components/layouts/containers/Container";
import Button from "@/components/common/Buttons";
import Card from "@/components/common/Card";
import { useCart } from "@/app/hooks/useCart";

const CartItemsTable = () => {
	const { items, updateCartItem, removeFromCart } = useCart();

	const handleQuantityChange = (productId, size, change) => {
		const item = items.find(
			(item) => item.product === productId && item.size === size
		);

		if (item) {
			const quantity = Math.max(1, item.quantity + change);
			updateCartItem({ productId, size, quantity });
		}
	};

	const handleProductRemoval = (productId, size) => {
		const item = items.find(
			(item) => item.product === productId && item.size === size
		);

		if (item) {
			removeFromCart({ productId, size });
		}
	};

	return (
		<Card variant="minimal" className="overflow-hidden">
			<div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				<table className="table table-lg">
					<thead>
						<tr className="bg-base-200/50 text-sm font-semibold text-primary border-b border-base-300/30">
							<th>PRODUCT</th>
							<th className="text-center">QUANTITY</th>
							<th className="text-center">PRICE</th>
							<th className="text-center">TOTAL</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-base-300/30">
						{items.map((item, idx) => (
							<tr key={idx} className="hover:bg-base-200/20 transition-colors">
								{/* Product Info */}
								<td>
									<ProductInfo item={item} />
								</td>
								{/* Quantity */}
								<td className="text-center">
									<FlexContainer>
										<div className="join">
											<Button
												variant="number-l"
												action={() =>
													handleQuantityChange(item.product, item.size, -1)
												}
												className="btn join-item"
												disabled={item.quantity <= 1}
											>
												<Minus className="w-4 h-4" />
											</Button>
											<span className="px-4 py-2 font-medium text-primary min-w-[3rem] text-center join-item bg-base-100">
												{item.quantity}
											</span>
											<Button
												variant="number-r"
												action={() =>
													handleQuantityChange(item.product, item.size, 1)
												}
												className="btn join-item"
											>
												<Plus className="w-4 h-4" />
											</Button>
										</div>
									</FlexContainer>
								</td>
								{/* Price */}
								<td className="text-center">
									<FlexContainer direction="column" className="gap-1">
										<H5>${item.price}</H5>
										{item.originalPrice > item.price && (
											<TextBody variant="small" className="line-through">
												₹{item.originalPrice}
											</TextBody>
										)}
									</FlexContainer>
								</td>
								{/* Total */}
								<td className="text-center">
									<FlexContainer direction="column" className="gap-2">
										<H5>₹{item.price * item.quantity}</H5>
										<div className="hidden md:flex items-center gap-1">
											<Button
												variant="icon"
												className="btn-sm"
												title="Add to wishlist"
											>
												<Heart className="w-4 h-4" />
											</Button>
											<Button
												variant="icon"
												action={() =>
													handleProductRemoval(item.product, item.size)
												}
												className="btn-sm text-error hover:bg-error/10"
												title="Remove item"
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</div>
									</FlexContainer>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Card>
	);
};

const ProductInfo = ({ item }) => {
	return (
		<FlexContainer justify="start" className="gap-4">
			<div className="relative flex-shrink-0">
				<img
					src={item.image}
					alt={item.name}
					className="w-24 h-24 object-cover rounded-xl border border-base-300/30"
				/>
				{item.discount > 0 && (
					<FloatingBadge size="xs" className="-top-2 -right-2">
						{item.discount}% OFF
					</FloatingBadge>
				)}
			</div>
			<div className="flex-1 min-w-0">
				<H5 className="mb-1 truncate">{item.name}</H5>
				<div className="flex flex-wrap gap-3 mb-2">
					<TextBody
						variant="small"
						className="bg-base-200 px-2 py-1 rounded-md"
					>
						Size: {item.size}
					</TextBody>
				</div>
				<FlexContainer justify="start" className="gap-2 mb-2">
					{!item.inStock ? (
						<FlexContainer className="gap-1 text-error text-sm">
							<Package className="w-4 h-4" />
							Out of Stock
						</FlexContainer>
					) : (
						<FlexContainer className="gap-1 text-success text-sm">
							<Package className="w-4 h-4" />
							In Stock
						</FlexContainer>
					)}
				</FlexContainer>
				<FlexContainer justify="start" className="gap-2 md:hidden">
					<Button variant="icon" className="btn-sm" title="Add to wishlist">
						<Heart className="w-4 h-4" />
					</Button>
					<Button
						variant="icon"
						className="btn-sm text-error hover:bg-error/10"
						title="Remove item"
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</FlexContainer>
			</div>
		</FlexContainer>
	);
};

export default CartItemsTable;
