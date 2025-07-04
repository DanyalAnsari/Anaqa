import React from "react";
import {
	RotateCcw,
	Shield,
	Headphones,
	Truck,
	Award,
	Clock,
} from "lucide-react";
import Container, {
	FlexContainer,
	GridContainer,
	HoverIconContainer,
	IconBaseContainer,
	LayoutContainer,
} from "../layouts/containers/Container";
import { SectionHeader } from "../common/Headers";
import { StatusBadge } from "../common/typography/Badge";
import { H4, H5 } from "../common/typography/Headings";
import { TextBody } from "../common/typography/Text";
import GradientBackground from "../layouts/containers/Gradients";
import Button from "../common/Buttons";

const Policy = () => {
	return (
		<section className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] bg-base-200/50 border-y border-base-300/30">
			<LayoutContainer className="py-16 md:py-20">
				<Container>
					{/* Section Header */}
					<SectionHeader
						label="Why Choose Us"
						heading="Our Service Commitment"
						description="We're dedicated to providing exceptional service and ensuring your
							complete satisfaction with every purchase."
					/>
					{/* Policies Grid */}
					<GridContainer columns="three" className="md:gap-8">
						{policies.map((policy, index) => {
							const IconComponent = policy.icon;
							return (
								<HoverIconContainer
									key={index}
									className="group bg-base-100 border-base-300/50 p-6 md:p-8 hover:border-primary/20 hover:-translate-y-1"
								>
									{/* Icon & Badge */}
									<FlexContainer justify="between" className="w-full mb-6">
										<IconBaseContainer
											margin=""
											className={`w-14 h-14 bg-${policy.color}/10  group-hover:scale-110 border-none`}
										>
											<IconComponent
												className={`w-7 h-7 text-${policy.color}`}
											/>
										</IconBaseContainer>
										<StatusBadge type={policy.color}>
											{policy.badge}
										</StatusBadge>
									</FlexContainer>

									{/* Content */}
									<div>
										<H5 className="mb-3 group-hover:text-primary transition-colors">
											{policy.title}
										</H5>
										<TextBody variant="small" className="leading-relaxed">
											{policy.description}
										</TextBody>
									</div>

									{/* Hover Effect Line */}
									<div
										className={`w-0 group-hover:w-full self-start h-0.5 bg-${policy.color} transition-all duration-500 mt-6 rounded-full`}
									></div>
								</HoverIconContainer>
							);
						})}
					</GridContainer>

					{/* Bottom CTA */}
					<div className="mt-12 md:mt-16 text-center">
						<GradientBackground
							type="card"
							className="border border-primary/20 shadow rounded-2xl p-6 md:p-8"
						>
							<FlexContainer
								direction="column"
								justify="between"
								className="md:flex-row gap-6"
							>
								<div className="text-center md:text-left">
									<H4 className="mb-2">Questions About Our Policies?</H4>
									<TextBody>
										Our customer service team is here to help you understand all
										our policies in detail.
									</TextBody>
								</div>
								<FlexContainer direction="column" className="sm:flex-row gap-3">
									<Button
										variant="secondary"
										className="btn-md"
									>
										View All Policies
									</Button>
									<Button className="btn-md">Contact Support</Button>
								</FlexContainer>
							</FlexContainer>
						</GradientBackground>
					</div>
				</Container>
			</LayoutContainer>
		</section>
	);
};

const policies = [
	{
		icon: RotateCcw,
		title: "Easy Exchange Policy",
		description: "Hassle-free exchanges within 30 days of purchase",
		badge: "30 Days",
		color: "accent",
	},
	{
		icon: Shield,
		title: "Quality Guarantee",
		description: "Premium quality products with manufacturer warranty",
		badge: "Certified",
		color: "success",
	},
	{
		icon: Headphones,
		title: "24/7 Customer Support",
		description: "Round-the-clock assistance for all your queries",
		badge: "Always On",
		color: "secondary",
	},
	{
		icon: Truck,
		title: "Free Shipping",
		description: "Complimentary shipping on orders above ₹999",
		badge: "₹999+",
		color: "primary",
	},
	{
		icon: Award,
		title: "Authentic Products",
		description: "100% genuine products from verified brands",
		badge: "Verified",
		color: "warning",
	},
	{
		icon: Clock,
		title: "Quick Delivery",
		description: "Fast and reliable delivery within 2-5 business days",
		badge: "2-5 Days",
		color: "error",
	},
];
export default Policy;
