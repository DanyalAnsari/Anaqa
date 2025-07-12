import React from "react";
import GradientBackground from "@/components/layouts/containers/Gradients";
import Container from "@/components/layouts/containers/Container";
import EmptyCartPage, {
	LoadingComponent,
} from "@/features/cart/components/EmptyCartPage";
import { SectionHeader } from "@/components/common/Headers";
import CartItemsTable from "@/features/cart/components/CartItemsTable";
import Button from "@/components/common/Buttons";
import { useNavigate } from "react-router";
import OrderSummary from "@/features/cart/components/OrderSummary";
import { useCart } from "@/app/hooks/useCart";
import { Trash } from "lucide-react";

const Cart = () => {
	const navigate = useNavigate();
	const { items, isLoading, totalQuantity, totalValue, clearCart } = useCart();
	const cartSummary = {
		totalQuantity,
		totalValue,
		discount: 500,
		shipping: 0,
		tax: 10,
		total: totalValue + 10 - 500 + 0,
	};

	if (isLoading) {
		return <LoadingComponent />;
	}

	if (items.length === 0) {
		console.log(items.length === 0);
		return <EmptyCartPage />;
	}

	return (
		<GradientBackground type="section" className="min-h-screen py-20">
			<Container>
				{/* Header */}
				<SectionHeader
					label="SHOPPING CART"
					heading="Your Cart"
					description={`${cartSummary.totalItems} ${
						cartSummary.totalItems === 1 ? "item" : "items"
					} in your cart`}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<CartItemsTable />

						{/* Continue Shopping */}
						<div className="mt-6">
							<Button action={() => clearCart()}>
								<Trash className="w-5 h-5" />
								Clear Cart
							</Button>
						</div>
						<div className="mt-6">
							<Button variant="outline" action={() => navigate("/products")}>
								Continue Shopping
							</Button>
						</div>
					</div>

					{/* Order Summary */}
					<OrderSummary cartSummary={cartSummary} />
				</div>
			</Container>
		</GradientBackground>
	);
};

export default Cart;
