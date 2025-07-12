import { useCart } from "@/app/hooks/useCart";
import Button from "@/components/common/Buttons";
import Card, { CardContent } from "@/components/common/Card";
import { ProductImage } from "@/components/common/ImageUtil";
import { H5 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Cart = () => {
	const navigate = useNavigate();
	const { totalQuantity, items, totalValue } = useCart();

	return (
		<div className="dropdown dropdown-end">
			<Button variant="icon" tabIndex={0} role="button" title="Shopping Cart">
				<div className="indicator">
					<ShoppingCart className="w-5 h-5" />
					<span className="badge badge-primary badge-sm indicator-item font-semibold">
						{totalQuantity}
					</span>
				</div>
			</Button>
			<Card
				tabIndex={0}
				className="card-compact dropdown-content z-[1] mt-3 w-80"
			>
				<CardContent padding="none">
					<div className="flex justify-between items-center mb-3">
						<H5>Shopping Cart</H5>
						<span className="text-sm font-medium text-primary">
							{totalQuantity}
						</span>
					</div>

					{/* Sample cart items */}
					<div className="space-y-2 max-h-60 overflow-y-auto">
						{items.map((item) => (
							<div className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg">
								<ProductImage width="w-10" height="h-10" src={item.image} />

								<div className="flex-1">
									<TextBody variant="label">Product Name</TextBody>
									<TextBody variant="caption">
										Qty:{item.quantity} ×{item.price}
									</TextBody>
								</div>
							</div>
						))}
					</div>

					<div className="divider my-2"></div>

					<div className="flex justify-between items-center mb-3">
						<span className="font-semibold">Subtotal:</span>
						<span className="text-lg font-bold text-primary">
							${totalValue}
						</span>
					</div>

					<div className="flex gap-2">
						<Button
							variant="small"
							className="flex-1"
							action={() => navigate("/cart")}
						>
							View Cart
						</Button>
						<Button
							className="btn-sm flex-1"
							action={() => navigate("/checkout")}
						>
							Checkout
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Cart;
