import React from "react";
import { Link } from "react-router";
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Youtube,
} from "lucide-react";
import Logo from "../common/Logo";
import Container, {
	FlexContainer,
	GridContainer,
	IconBaseContainer,
	SectionContainer,
} from "../layouts/containers/Container";
import { TextBody } from "../common/typography/Text";
import { H5 } from "../common/typography/Headings";

const Footer = () => {
	return (
		<footer className="bg-base-200/50 border-t border-base-300/30">
			{/* Main Footer Content */}
			<SectionContainer>
				<Container>
					<GridContainer columns="four">
						<CompanyInfo />
						<QuickLinks
							heading={"Quick Links"}
							links={[
								{ name: "Home", path: "/" },
								{ name: "About Us", path: "/about" },
								{ name: "Shop", path: "/collection" },
								{ name: "Contact", path: "/contact" },
							]}
						/>
						{/* Policies */}
						<QuickLinks
							heading="Policies"
							links={[
								{ name: "Privacy Policy", path: "/" },
								{ name: "Terms of Service", path: "/" },
								{ name: "Shipping Policy", path: "/" },
								{ name: "Return Policy", path: "/" },
							]}
						/>
					</GridContainer>

					{/* Social Media */}
					<SocialMediaIcons
						items={[
							{ icon: Facebook, label: "Facebook" },
							{ icon: Twitter, label: "Twitter" },
							{ icon: Instagram, label: "Instagram" },
							{ icon: Youtube, label: "YouTube" },
						]}
					/>
				</Container>
			</SectionContainer>

			{/* Bottom Bar */}
			<BottomBar />
		</footer>
	);
};

const CompanyInfo = () => (
	<div className="lg:col-span-2">
		<div className="mb-6">
			<Logo />
		</div>
		<TextBody className="leading-relaxed mb-6 max-w-md">
			We are committed to providing you with the best possible online shopping
			experience. Our team is dedicated to ensuring that your shopping journey
			is hassle-free and enjoyable.
		</TextBody>

		{/* Contact Info */}
		<div className="space-y-3">
			{[
				{
					icon: Phone,
					label: "+91 1234567890",
				},
				{
					icon: Mail,
					label: "mh.danyalansari@gmail.com",
				},
				{
					icon: MapPin,
					label: "Gorakhpur, Uttar-Pradesh, India",
				},
			].map((item, idx) => (
				<FlexContainer key={idx} justify="start" className="gap-3">
					<item.icon className="w-4 h-4 text-primary" />
					<TextBody
						variant="small"
						className="hover:text-primary transition-colors"
					>
						{item.label}
					</TextBody>
				</FlexContainer>
			))}
		</div>
	</div>
);

const QuickLinks = ({ links, heading }) => {
	return (
		<div>
			<H5 className="mb-6">{heading}</H5>
			<ul className="space-y-3">
				{links.map((link) => (
					<li key={link.name}>
						<Link
							to={link.path}
							className="text-neutral hover:text-primary text-sm hover:translate-x-1 inline-block transition-all duration-300"
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const SocialMediaIcons = ({ items }) => {
	return (
		<div className="mt-12 pt-8 border-t border-base-300/30">
			<FlexContainer
				justify="between"
				direction="column"
				className="md:flex-row gap-6"
			>
				<div className="flex items-center gap-4">
					<TextBody variant="label">Follow Us:</TextBody>
					<div className="flex gap-3">
						{items.map((item) => (
							<IconBaseContainer
								key={item.label}
								className="w-10 h-10 bg-base-100 border-base-300/50 rounded-full text-neutral hover:bg-primary hover:text-primary-content hover:border-primary"
								title={item.label}
							>
								<item.icon className="w-5 h-5" />
							</IconBaseContainer>
						))}
					</div>
				</div>

				{/* Newsletter CTA */}
				<div className="text-center md:text-right">
					<TextBody variant="small" className="mb-2">
						Subscribe to get special offers & updates
					</TextBody>
					<Link to="/newsletter" className="btn btn-primary btn-sm">
						Subscribe Now
					</Link>
				</div>
			</FlexContainer>
		</div>
	);
};

const BottomBar = () => {
	return (
		<div className="bg-base-300/20 border-t border-base-300/30">
			<Container className="py-6">
				<FlexContainer
					direction="column"
					justify="between"
					className="md:flex-row gap-4"
				>
					<TextBody variant="small" className="text-center md:text-left">
						© {new Date().getFullYear()} ACME Industries Ltd. All rights
						reserved.
					</TextBody>
					<div className="flex items-center gap-6 text-xs text-neutral">
						<span>Designed with ❤️ in India</span>
						<span>•</span>
						<span>Powered by React</span>
					</div>
				</FlexContainer>
			</Container>
		</div>
	);
};
export default Footer;
