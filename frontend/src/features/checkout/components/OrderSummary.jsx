import React from "react";
import { Shield, Clock, CheckCircle } from "lucide-react";
import Card from "@/components/common/Card";
import { H4 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { FlexContainer } from "@/components/layouts/containers/Container";

// Order Summary Component
const OrderSummary = ({ subtotal, deliveryFee }) => {
	const total = subtotal + deliveryFee;

	return (
		<Card className="p-8">
			<div className="mb-6">
				<H4 className="mb-2">Order Summary</H4>
				<TextBody variant="small">Review your order details</TextBody>
			</div>

			<div className="space-y-4">
				{[
					{
						label: "Subtotal",
						value: `$${subtotal.toFixed(2)}`,
					},
					{
						label: "Delivery Fee",
						value: `$${deliveryFee.toFixed(2)}`,
					},
				].map((item) => (
					<InfoRow key={item.label} label={item.label} value={item.value} />
				))}

				<FlexContainer
					justify="between"
					className="py-3 border-t-2 border-primary/20"
				>
					<span className="text-lg font-bold text-primary">Total</span>
					<span className="text-lg font-bold text-primary">
						${total.toFixed(2)}
					</span>
				</FlexContainer>
			</div>

			{/* Trust Indicators */}
			<div className="mt-6 pt-6 border-t border-base-300/50">
				{[
					{
						icon: Shield,
						text: "Secure payment protected",
					},
					{
						icon: Clock,
						text: "Fast delivery available",
					},
					{
						icon: CheckCircle,
						text: "Money-back guarantee",
					},
				].map((item, idx) => (
					<FlexContainer key={idx} justify="between" className="gap-3 mb-3">
						<item.icon className={`w-4 h-4 text-success`} />
						<TextBody variant="small">{item.text}</TextBody>
					</FlexContainer>
				))}
			</div>
		</Card>
	);
};

const InfoRow = ({ label, value }) => (
	<FlexContainer justify="between" className="py-3 border-b border-base-300/50">
		<TextBody>{label}</TextBody>
		<span className="text-primary font-semibold">{value}</span>
	</FlexContainer>
);

export default OrderSummary;
