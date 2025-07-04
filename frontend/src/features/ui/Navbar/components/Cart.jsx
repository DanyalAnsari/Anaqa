import { ShoppingCart } from "lucide-react";
import React from "react";

const Cart = () => {
	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
				title="Shopping Cart"
			>
				<div className="indicator">
					<ShoppingCart className="w-5 h-5" />
					<span className="badge badge-primary badge-sm indicator-item font-semibold">
						8
					</span>
				</div>
			</div>
			<div
				tabIndex={0}
				className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow-lg border border-base-200"
			>
				<div className="card-body">
					<div className="flex justify-between items-center mb-2">
						<span className="text-lg font-bold">Shopping Cart</span>
						<span className="text-sm text-base-content/70">8 Items</span>
					</div>

					{/* Sample cart items */}
					<div className="space-y-2 max-h-60 overflow-y-auto">
						<div className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg">
							<div className="w-10 h-10 bg-base-300 rounded"></div>
							<div className="flex-1">
								<p className="text-sm font-medium">Product Name</p>
								<p className="text-xs text-base-content/70">Qty: 2 × $49.99</p>
							</div>
						</div>
						<div className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg">
							<div className="w-10 h-10 bg-base-300 rounded"></div>
							<div className="flex-1">
								<p className="text-sm font-medium">Another Product</p>
								<p className="text-xs text-base-content/70">Qty: 1 × $29.99</p>
							</div>
						</div>
					</div>

					<div className="divider my-2"></div>

					<div className="flex justify-between items-center mb-3">
						<span className="font-semibold">Subtotal:</span>
						<span className="text-lg font-bold text-primary">$999.00</span>
					</div>

					<div className="flex gap-2">
						<button className="btn btn-outline btn-sm flex-1">View Cart</button>
						<button className="btn btn-primary btn-sm flex-1">Checkout</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
