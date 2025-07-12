import React from "react";
import { Calendar, CreditCard, MapPin, Phone } from "lucide-react";
import {
	FlexContainer,
	GridContainer,
} from "@/components/layouts/containers/Container";
import { TextBody } from "@/components/common/typography/Text";

const OrderMetaInfo = ({ order }) => {
	return (
		<div className="bg-base-200/50 rounded-xl p-4 mb-6">
			<GridContainer className="lg:grid-cols-4 gap-4">
				{[
					{
						icon: {
							type: Calendar,
							color: "text-neutral",
						},
						label: "Order Date",
						info: new Date(order.createdAt).toLocaleDateString(),
						caption: "",
					},
					{
						icon: {
							type: CreditCard,
							color: "text-success",
						},
						label: "Payment",
						info: order.paymentMethod,
						caption: "",
					},
					{
						icon: {
							type: MapPin,
							color: "text-warning",
						},
						label: "Delivery To",
						info: `${order.address.firstName} ${order.address.lastName}`,
						caption: `${order.address.city}, ${order.address.state}`,
					},
					{
						icon: {
							type: Phone,
							color: "text-accent",
						},
						label: "Contact",
						info: order.address.phone,
						caption: order.address.email,
					},
				].map((item, idx) => (
					<InfoContainer
						key={idx}
						icon={item.icon}
						label={item.label}
						info={item.info}
						caption={item.caption}
					/>
				))}
			</GridContainer>
		</div>
	);
};

const InfoContainer = ({ icon, label, info, caption }) => {
	return (
		<FlexContainer justify="start" className="gap-2">
			<icon.type className={`w-4 h-4 ${icon.color}`} />
			<div>
				<TextBody variant="caption" className="uppercase">
					{label}
				</TextBody>
				<TextBody variant="badge">{info}</TextBody>
				{caption !== "" && <TextBody variant="caption">{caption}</TextBody>}
			</div>
		</FlexContainer>
	);
};

export default OrderMetaInfo;
