import { H6 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import {
	GridContainer,
	HoverIconContainer,
	IconBaseContainer,
} from "@/components/layouts/containers/Container";
import { RefreshCw, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
	return (
		<GridContainer
			columns="features"
			className="gap-4 pt-6 border-t border-base-300"
		>
			{featuresData.map((item) => (
				<HoverIconContainer
					key={item.label}
					className="p-4 bg-base-200/50 border-base-300/30 text-center gap-3"
				>
					<IconBaseContainer className={`w-12 h-12 ${item.color[0]}`}>
						<item.icon className={`w-5 h-5 text-info ${item.color[1]}`} />
					</IconBaseContainer>
					<div>
						<H6>{item.label[0]}</H6>
						<TextBody variant="small">{item.label[1]}</TextBody>
					</div>
				</HoverIconContainer>
			))}
		</GridContainer>
	);
};

const featuresData = [
	{
		icon: Truck,
		color: ["bg-accent/10 border-accent/30", "text-accent"],
		label: ["Free Shipping", "On orders over $50"],
	},
	{
		icon: Shield,
		color: ["bg-success/10 border-success/30", "text-success"],
		label: ["Secure Payment", "100% protected"],
	},
	{
		icon: RefreshCw,
		color: ["bg-warning/10 border-warning/30", "text-warning"],
		label: ["Easy Returns", "30-day policy"],
	},
];

export default Features;
