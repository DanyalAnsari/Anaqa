import React from "react";
import { TextBody } from "../common/typography/Text";
import { H2 } from "../common/typography/Headings";

const SectionHeader = ({ sectionLabel, heading, description }) => {
	return (
		<div className="text-center mb-16">
			<div className="flex items-center justify-center gap-3 mb-4">
				<div className="w-12 h-1 bg-secondary rounded-full"></div>
				<TextBody
					variant={"label"}
					className="text-secondary tracking-wider uppercase"
				>
					{sectionLabel}
				</TextBody>
				<div className="w-12 h-1 bg-secondary rounded-full"></div>
			</div>
			<H2 className="mb-4">{heading}</H2>
			<TextBody variant={"large"} className="max-w-2xl mx-auto">
				{description}
			</TextBody>
		</div>
	);
};

export default SectionHeader;
