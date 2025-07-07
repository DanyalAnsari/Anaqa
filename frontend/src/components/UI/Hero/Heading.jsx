import React from "react";
import Divider from "@/components/common/Divider";
import { H1 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { StatusBadge } from "@/components/common/typography/Badge";

const Heading = () => {
	return (
		<div className="mb-8">
			<FlexContainer className="lg:justify-start gap-3 mb-6">
				<Divider variant={"end"} className="bg-secondary" />
				<StatusBadge type="secondary" className="badge-lg">
					Spring 2025
				</StatusBadge>
			</FlexContainer>

			<H1 className="mb-6">
				<span className="block">Latest</span>
				<span className="text-secondary">Arrivals</span>
			</H1>

			<TextBody className={"max-w-lg mx-auto lg:mx-0 mb-8"} variant={"large"}>
				Discover our curated collection of premium clothing that combines
				Nordic-inspired design with modern sophistication and sustainable
				craftsmanship.
			</TextBody>
		</div>
	);
};

export default Heading;
