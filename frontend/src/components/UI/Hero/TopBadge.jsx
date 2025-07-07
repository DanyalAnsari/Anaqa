import React from "react";
import { Star } from "lucide-react";
import { TextBody } from "@/components/common/typography/Text";
import { FlexContainer } from "@/components/layouts/containers/Container";

const TopBadge = () => {
	return (
		<FlexContainer className="lg:justify-start gap-3 mb-8">
			<FlexContainer justify="start" className="gap-1">
				{[...Array(5)].map((_, i) => (
					<Star key={i} className="w-4 h-4 fill-warning text-warning" />
				))}
			</FlexContainer>
			<TextBody className="font-medium" variant={"small"}>
				Trusted by 50k+ customers
			</TextBody>
		</FlexContainer>
	);
};

export default TopBadge;
