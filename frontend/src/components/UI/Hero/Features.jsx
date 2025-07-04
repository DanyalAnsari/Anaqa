import React from "react";
import { RefreshCw, Shield, Truck } from "lucide-react";
import { FeatureIcon } from "@/components/common/typography/Badge";
import { FlexContainer } from "@/components/layouts/containers/Container";

const Features = () => {
	const features = [
		{
			text: "Free Shipping",
			icon: <Truck />,
			type: "info",
		},
		{
			text: "Easy Returns",
			icon: <RefreshCw />,
			type: "success",
		},
		{
			text: "Secure Payment",
			icon: <Shield />,
			type: "secondary",
		},
	];
	return (
		<FlexContainer className="flex-wrap lg:justify-start gap-8 text-sm">
			{features.map((feature, index) => (
				<FlexContainer key={index} className="gap-2 text-neutral">
					<FeatureIcon icon={feature.icon} bgColor={feature.type} />
					<span className="font-medium">{feature.text}</span>
				</FlexContainer>
			))}
		</FlexContainer>
	);
};

export default Features;
