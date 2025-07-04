import React from "react";
import { Star } from "lucide-react";
import { TextBody } from "@/components/common/typography/Text";

const TopBadge = () => {
	return (
		<div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
			<div className="flex items-center gap-1">
				{[...Array(5)].map((_, i) => (
					<Star key={i} className="w-4 h-4 fill-warning text-warning" />
				))}
			</div>
			<TextBody className="font-medium" variant={"small"}>
				Trusted by 50k+ customers
			</TextBody>
		</div>
	);
};

export default TopBadge;
