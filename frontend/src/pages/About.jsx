import { assets } from "@/assets/assets";
import React from "react";
import { Shield, Heart, Award, Users, Truck, Star } from "lucide-react";
import GradientBackground from "@/components/layouts/containers/Gradients";
import Container, {
	FlexContainer,
	GridContainer,
	IconBaseContainer,
} from "@/components/layouts/containers/Container";
import { SectionHeader } from "@/components/common/Headers";
import Card from "@/components/common/Card";
import { H3, H4 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import { HoverImage, ImageOverlay } from "@/components/common/ImageUtil";
import { StarRating } from "@/components/common/Input";

const About = () => {
	return (
		<GradientBackground type="section" className="min-h-screen">
			{/* Hero Section */}
			<GradientBackground className="pt-16 pb-20">
				<Container className="max-w-7xl mx-auto px-4">
					<SectionHeader
						label="LEARN MORE"
						heading="About Us"
						description="Discover the story behind our passion for excellence and commitment to bringing you the finest products."
					/>

					{/* Stats Section */}
					<GridContainer
						columns="four"
						className="sm:grid-cols-2 mb-8 lg:mb-20"
					>
						{stats.map((stat, index) => (
							<Card
								interactive={false}
								key={index}
								className="text-center p-6  hover:border-primary/20"
							>
								<H3 className="xl:text-4xl mb-2">{stat.number}</H3>
								<TextBody variant="small">{stat.label}</TextBody>
							</Card>
						))}
					</GridContainer>
				</Container>
			</GradientBackground>

			{/* Main Content Section */}
			<Container className="py-20">
				<FlexContainer
					direction="column"
					justify="start"
					className="lg:flex-row gap-16  mb-20"
				>
					<div className="lg:w-1/2">
						<div className="relative group">
							<HoverImage
								src={assets.about_img}
								alt="About us"
								className="rounded-2xl shadow-2xl"
							/>
							<ImageOverlay
								variant="card"
								className="rounded-2xl"
							></ImageOverlay>
						</div>
					</div>

					<div className="lg:w-1/2 space-y-6">
						<div className="space-y-6">
							<TextBody variant="large">
								Founded with a vision to revolutionize online shopping, we've
								built more than just an e-commerce platform—we've created a
								community of discerning customers who value quality,
								authenticity, and exceptional service.
							</TextBody>
							<TextBody variant="large">
								Our journey began with a simple belief: everyone deserves access
								to premium products at fair prices. Today, we continue to uphold
								this principle while constantly innovating to enhance your
								shopping experience.
							</TextBody>
						</div>

						<Card variant="feature" className="p-8">
							<H3 className="mb-4 flex items-center gap-3">
								<Star className="w-6 h-6 text-secondary" />
								Our Mission
							</H3>
							<TextBody variant="large">
								To empower individuals through exceptional products and
								experiences that enhance their lifestyle. We strive to be your
								trusted partner in discovering, acquiring, and enjoying the
								things that matter most to you.
							</TextBody>
						</Card>
					</div>
				</FlexContainer>

				{/* Why Choose Us Section */}
				<SectionHeader
					label="OUR ADVANTAGES"
					heading="Why Choose Us"
					description="We're not just another online store. Here's what sets us apart from the competition."
				/>

				{/* Features Grid */}
				<GridContainer columns="features" className="gap-8 mb-20">
					{features.map((feature, index) => (
						<div key={index} className="group">
							<Card
								interactive={false}
								className={`p-8 h-full hover:border-primary/20 hover:shadow-xl`}
							>
								<IconBaseContainer className="w-16 h-16 bg-gradient-to-br from-info/10 to-info/20 border-info/30 mb-6">
									<feature.icon className="w-8 h-8 text-info" />
								</IconBaseContainer>
								<H4 className="mb-4">{feature.title}</H4>
								<TextBody className="leading-relaxed">
									{feature.description}
								</TextBody>
							</Card>
						</div>
					))}
				</GridContainer>

				{/* Trust Indicators */}
				<GradientBackground
					type="section"
					className="rounded-2xl p-12 text-center border border-base-300/70"
				>
					<FlexContainer className="gap-3 mb-6">
						<Users className="w-6 h-6 text-secondary" />
						<span className="text-secondary font-medium text-sm tracking-wider uppercase">
							TRUSTED BY THOUSANDS
						</span>
					</FlexContainer>
					<H3 className="mb-4">Join Our Growing Community</H3>
					<TextBody variant="large" className="max-w-3xl mx-auto mb-8">
						Experience the difference that comes with choosing a brand committed
						to excellence. Join thousands of satisfied customers who have made
						us their preferred shopping destination.
					</TextBody>
					<FlexContainer className="gap-2 mb-6">
						<StarRating rating={5} />
						<span className="text-neutral font-medium ml-2">
							4.9/5 Customer Rating
						</span>
					</FlexContainer>
					<FlexContainer className="flex-wrap gap-6 text-sm text-neutral">
						{[
							{
								icon: <Truck className="w-4 h-4 text-success" />,
								label: "Free Shipping Available",
							},
							{
								icon: <Shield className="w-4 h-4 text-info" />,
								label: "Secure Payment",
							},
							{ icon: Award, label: "Quality Guaranteed" },
						].map(({ icon, label }, index) => (
							<div key={index} className="flex items-center gap-2">
								{icon}
								<Award className="w-4 h-4 text-warning" />
								<span>{label}</span>
							</div>
						))}
					</FlexContainer>
				</GradientBackground>
			</Container>
		</GradientBackground>
	);
};

const features = [
	{
		icon: Shield,
		title: "Quality Assurance",
		description:
			"We meticulously curate every product in our collection, ensuring only the finest materials and craftsmanship reach our customers. Our rigorous quality control process guarantees excellence in every purchase.",
	},
	{
		icon: Heart,
		title: "Convenience",
		description:
			"Shopping with us is effortless and enjoyable. From intuitive navigation to seamless checkout, we've designed every touchpoint to save you time while delivering exactly what you need.",
	},
	{
		icon: Award,
		title: "Exceptional Customer Service",
		description:
			"Our dedicated support team is committed to your satisfaction. We provide personalized assistance, quick responses, and go above and beyond to ensure your experience exceeds expectations.",
	},
];

const stats = [
	{ number: "50K+", label: "Happy Customers" },
	{ number: "10K+", label: "Products Sold" },
	{ number: "99%", label: "Customer Satisfaction" },
	{ number: "24/7", label: "Support Available" },
];

export default About;
