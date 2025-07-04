import React from "react";
import { Truck, Shield, RefreshCw } from "lucide-react";
import Container, {
	GridContainer,
	IconBaseContainer,
} from "../layouts/containers/Container";
import { H4 } from "../common/typography/Headings";
import { TextBody } from "../common/typography/Text";

const SecondaryFeatures = () => {
	return (
		<div className="bg-base-200/50 py-16 border-t border-base-300/30">
			<Container>
				<GridContainer columns="features">
					{featuresData.map((feature, index) => (
						<FeatureBox
							key={index}
							className={feature.className}
							heading={feature.heading}
							text={feature.text}
							icon={feature.icon}
						/>
					))}
				</GridContainer>
			</Container>
		</div>
	);
};

const FeatureBox = ({ className, heading, text, icon }) => {
	return (
		<div className="text-center group">
			<IconBaseContainer className={`w-20 h-20 mb-6 ${className}`}>
				{icon}
			</IconBaseContainer>
			<H4 className="mb-3">{heading}</H4>
			<TextBody className="leading-relaxed">{text}</TextBody>
		</div>
	);
};

const featuresData = [
	{
		className: "bg-info/10 group-hover:bg-info/15 border-info/10",
		icon: <Truck className="w-9 h-9 text-info" />,
		heading: "Free Shipping",
		text: "Free shipping on orders over $100. Express delivery available nationwide.",
	},
	{
		className: "bg-success/10 group-hover:bg-success/15 border-success/10",
		icon: <RefreshCw className="w-9 h-9 text-success" />,
		heading: "Easy Returns",
		text: "30-day hassle-free returns. No questions asked policy for your peace of mind",
	},
	{
		className:
			"bg-secondary/10 group-hover:bg-secondary/15 border-secondary/10",
		icon: <Shield className="w-9 h-9 text-secondary" />,
		heading: "Secure Payment",
		text: "Your payment information is always safe and secure with bank-level encryption.",
	},
];

export default SecondaryFeatures;
