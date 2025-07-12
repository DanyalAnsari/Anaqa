import React, { useState } from "react";
import { Package } from "lucide-react";
import { useOrders } from "@/app/hooks/useOrders";
import Container, {
	FlexContainer,
	IconBaseContainer,
} from "@/components/layouts/containers/Container";
import { SectionHeader } from "@/components/common/Headers";
import Card, { CardContent } from "@/components/common/Card";
import FilterBar from "@/features/checkout/components/orders/FilterBar";
import OrderCard from "@/features/checkout/components/orders/card/OrderCard";
import { H3 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import Button from "@/components/common/Buttons";
import { useNavigate } from "react-router";

const Orders = () => {
	const { orders, refetch, isLoading } = useOrders();
	const [filterStatus, setFilterStatus] = useState("all");
	const navigate = useNavigate();

	// Mock currency for demo - replace with actual currency from context
	const currency = "$";

	const filteredOrders =
		filterStatus === "all"
			? orders
			: orders.filter((order) => order.status.toLowerCase() === filterStatus);

	return (
		<Container className="py-20">
			{/* Section Header */}
			<SectionHeader
				label="ORDER HISTORY"
				heading="My Orders"
				description="Track and manage all your orders in one place"
			/>

			{/* Filter and Actions Bar */}

			<FilterBar
				filterStatus={filterStatus}
				setFilterStatus={setFilterStatus}
				refetch={refetch}
				isLoading={isLoading}
			/>

			{/* Orders List */}
			<div className="space-y-6">
				{filteredOrders.length > 0 ? (
					filteredOrders.map((order) => (
						<OrderCard key={order._id} currency={currency} order={order} />
					))
				) : (
					<div className="text-center py-20">
						<IconBaseContainer className="w-32 h-32 bg-base-200 border-base-300/40 rounded-full mb-8">
							<Package className="w-16 h-16 text-secondary" />
						</IconBaseContainer>
						<H3 className="mb-4">No Orders Found</H3>
						<TextBody variant="large" className="mb-8">
							{filterStatus === "all"
								? "You haven't placed any orders yet."
								: `No orders found with status: ${filterStatus}`}
						</TextBody>
						<Button
							action={() => {
								filterStatus === "all"
									? navigate("/products")
									: setFilterStatus("all");
							}}
						>
							{filterStatus === "all" ? "Start Shopping" : "Show All Orders"}
						</Button>
					</div>
				)}
			</div>

			{/* Order Summary Stats */}
			{filteredOrders.length > 0 && (
				<div className="mt-16 bg-gradient-to-br from-info/5 to-info/10 rounded-2xl p-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-primary mb-2">
								{filteredOrders.length}
							</div>
							<p className="text-neutral">Total Orders</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-success mb-2">
								{currency}
								{filteredOrders
									.reduce((sum, order) => sum + order.amount, 0)
									.toFixed(2)}
							</div>
							<p className="text-neutral">Total Spent</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-info mb-2">
								{
									filteredOrders.filter(
										(order) => order.status.toLowerCase() === "delivered"
									).length
								}
							</div>
							<p className="text-neutral">Delivered</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-warning mb-2">
								{filteredOrders.reduce(
									(sum, order) => sum + order.products.length,
									0
								)}
							</div>
							<p className="text-neutral">Items Purchased</p>
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};

export default Orders;
