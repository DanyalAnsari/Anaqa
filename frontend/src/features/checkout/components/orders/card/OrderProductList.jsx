import { StatusBadge } from "@/components/common/typography/Badge";
import { H6 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { FlexContainer } from "@/components/layouts/containers/Container";
import React, { useState } from "react";

const OrderProductList = ({ order, currency }) => {
	const [expandedOrders, setExpandedOrders] = useState(new Set());
	const toggleOrderExpansion = (orderId) => {
		const newExpanded = new Set(expandedOrders);
		if (newExpanded.has(orderId)) {
			newExpanded.delete(orderId);
		} else {
			newExpanded.add(orderId);
		}
		setExpandedOrders(newExpanded);
	};
	return (
		<div className="space-y-4">
			{order.products
				.slice(0, expandedOrders.has(order._id) ? order.products.length : 2)
				.map((product, index) => (
					<div
						key={`${product.productId}-${index}`}
						className="flex items-center gap-4 p-4 bg-base-50 rounded-lg border border-base-300/40"
					>
						<figure className="w-16 h-16 rounded-lg overflow-hidden bg-base-200 flex-shrink-0">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-full object-cover"
							/>
						</figure>

						<div className="flex-1">
							<H6>{product.name}</H6>
							<FlexContainer
								justify="start"
								className="flex-wrap gap-4 mt-1 text-sm text-neutral"
							>
								<span className="flex items-center gap-1">
									<span className="font-medium">Price:</span>
									<span className="font-bold text-primary">
										{currency}
										{product.price}
									</span>
								</span>
								<span className="flex items-center gap-1">
									<span className="font-medium">Qty:</span>
									<span className="badge badge-neutral badge-sm">
										{product.quantity}
									</span>
								</span>
								<span className="flex items-center gap-1">
									<span className="font-medium">Size:</span>
									<StatusBadge className="badge-outline badge-sm">
										{product.size}
									</StatusBadge>
								</span>
							</FlexContainer>
						</div>

						<div className="text-right">
							<H6>
								{currency}
								{(product.price * product.quantity).toFixed(2)}
							</H6>
							<TextBody variant="caption">Subtotal</TextBody>
						</div>
					</div>
				))}

			{order.products.length > 2 && (
				<button
					onClick={() => toggleOrderExpansion(order._id)}
					className="btn btn-ghost btn-sm w-full"
				>
					{expandedOrders.has(order._id)
						? `Show Less (${order.products.length - 2} items hidden)`
						: `Show ${order.products.length - 2} More Items`}
				</button>
			)}
		</div>
	);
};

export default OrderProductList;
