import React from "react";
import TopBadge from "./TopBadge";
import CTAButtons from "./CTAButtons";
import HeroImage from "./HeroImage";
import Heading from "./Heading";
import Features from "./Features";
import Container, {
	ResponsiveContainer,
} from "@/components/layouts/containers/Container";

const Hero = () => {
	return (
		<Container className="hero min-h-[75vh] p-0">
			<ResponsiveContainer className="hero-content p-4 lg:p-8 gap-8 lg:gap-16">
				{/* Image Section */}
				<HeroImage />
				{/* Content Section */}
				<div className="flex-1 text-center lg:text-left">
					<TopBadge />
					<Heading />
					<CTAButtons />
					<Features />
				</div>
			</ResponsiveContainer>
		</Container>
	);
};

export default Hero;
