import Card, { CardContent } from "@/components/common/Card";
import { Package, RefreshCw, Eye } from "lucide-react";
import { FlexContainer } from "@/components/layouts/containers/Container";
import React from "react";
import { H3, H5 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { StatusBadge } from "@/components/common/typography/Badge";
import OrderCardHeader from "./OrderCardHeader";
import OrderMetaInfo from "./OrderMetaInfo";
import OrderProductList from "./OrderProductList";
import Button from "@/components/common/Buttons";

const OrderCard = ({ order, currency }) => {
	return (
		<Card interactive={false} variant="elevated" key={order._id}>
			<CardContent>
				{/* Order Header */}
				<OrderCardHeader order={order} currency={currency} />

				{/* Order Meta Information */}
				<OrderMetaInfo order={order} />

				{/* Products List */}
				<OrderProductList order={order} currency={currency} />

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 mt-6">
					<Button className="btn-sm">
						<Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
						Track Order
					</Button>

					<Button variant="secondary" className="btn-sm">
						<Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
						View Details
					</Button>

					{order.status.toLowerCase() === "delivered" && (
						<button className="btn btn-outline btn-accent btn-sm group">
							<RefreshCw className="w-4 h-4 group-hover:scale-110 transition-transform" />
							Reorder
						</button>
					)}

					{order.status.toLowerCase() === "pending" && (
						<button className="btn btn-outline btn-error btn-sm group">
							Cancel Order
						</button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderCard;
