import React from "react";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { H3, H5 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { StatusBadge } from "@/components/common/typography/Badge";
import { getStatusColor, getStatusIcon } from "@/utilities/productUtils";

const OrderCardHeader = ({ order, currency }) => {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
			<FlexContainer justify="start" className="gap-4">
				<H3>{getStatusIcon(order.status)}</H3>
				<div>
					<H5>Order #{order._id.slice(-8).toUpperCase()}</H5>
					<TextBody variant="small" className="text-sm text-neutral">
						{order.products.length} item
						{order.products.length > 1 ? "s" : ""}
					</TextBody>
				</div>
			</FlexContainer>

			<FlexContainer justify="between" className="gap-4">
				<StatusBadge type={getStatusColor(order.status)} className={`badge-lg`}>
					{order.status}
				</StatusBadge>
				<div className="text-right">
					<H5>
						{currency}
						{order.amount}
					</H5>
					<TextBody variant="caption">Total Amount</TextBody>
				</div>
			</FlexContainer>
		</div>
	);
};

export default OrderCardHeader;
