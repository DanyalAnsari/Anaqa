import React from "react";
import { TextBody } from "./typography/Text";
import { FlexContainer } from "../layouts/containers/Container";
import { H2, H3 } from "./typography/Headings";

// Section Header Component
export const SectionHeader = ({
	label = "",
	variant = "main",
	heading = "",
	description = "",
}) => {
	const type = variants[variant];
	
	return (
		<div className={`${type.container}`}>
			{label && (
				<FlexContainer className="gap-3 mb-4">
					<div className={`${type.divider} h-1 rounded-full`} />
					<TextBody variant="badge" className={`${type.color}`}>
						{label}
					</TextBody>
					<div className={`${type.divider} h-1 rounded-full`} />
				</FlexContainer>
			)}

			{heading &&
				(variant === "main" ? (
					<H2 className="mb-4">{heading}</H2>
				) : (
					<H3 className="mb-3">{heading}</H3>
				))}

			{description && (
				<TextBody variant={type.text} className={`${type.textClass}`}>
					{description}
				</TextBody>
			)}
		</div>
	);
};

const variants = {
	main: {
		container: "text-center mb-12 md:mb-16",
		divider: "w-12 bg-secondary",
		color: "text-secondary",
		text: "large",
		textClass: "max-w-xl mx-auto",
	},
	sub: {
		container: "text-center mb-12",
		divider: "w-8 bg-accent",
		color: "text-accent",
		text: "regular",
		textClass: "",
	},
	subSuccess: {
		container: "text-center mb-12",
		divider: "w-8 bg-success",
		color: "text-success",
		text: "regular",
		textClass: "",
	},
};
