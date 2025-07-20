import { assets } from "@/assets/assets";
import React, { useState } from "react";
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	MessageCircle,
	Send,
	Briefcase,
	Users,
	Globe,
	ArrowRight,
	Star,
} from "lucide-react";
import GradientBackground from "@/components/layouts/containers/Gradients";
import Container, {
	FlexContainer,
	GridContainer,
	HoverIconContainer,
	IconBaseContainer,
} from "@/components/layouts/containers/Container";
import { SectionHeader } from "@/components/common/Headers";
import { Input, StarRating } from "@/components/common/Input";
import Card from "@/components/common/Card";
import { H2, H3, H4, H5 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import Button from "@/components/common/Buttons";
import { HoverImage, ImageOverlay } from "@/components/common/ImageUtil";
import { StatusBadge } from "@/components/common/typography/Badge";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
	};

	return (
		<GradientBackground type="section" className="min-h-screen">
			{/* Hero Section */}
			<GradientBackground className="pt-16 pb-20">
				<Container>
					<SectionHeader
						label="GET IN TOUCH"
						heading="Contact Us"
						description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
					/>

					{/* Quick Stats */}
					<GridContainer columns="four" className="gap-6 mb-20">
						{[
							{
								label: "24/7",
								description: "Customer Support",
							},
							{
								label: "< 2h",
								description: "Average Response",
							},
							{
								label: "99%",
								description: "Issue Resolution",
							},
							{
								label: <StarRating rating={5} />,
								description: "Customer Rating",
							},
						].map((item, index) => (
							<Card
								interactive={false}
								className="text-center p-6 hover:border-primary/20"
							>
								<H2 className="mb-2">{item.label}</H2>
								<TextBody variant="small">{item.description}</TextBody>
							</Card>
						))}
					</GridContainer>
				</Container>
			</GradientBackground>

			{/* Main Content */}
			<Container className="py-20">
				{/* Contact Form and Image Section */}
				<GridContainer columns="two" className="gap-16 mb-20">
					{/* Contact Form */}
					<Card interactive={false} className="p-8 hover:border-primary/20 ">
						<div className="mb-8">
							<H3 className="mb-4">Send us a Message</H3>
							<TextBody>
								Fill out the form below and we'll get back to you within 24
								hours.
							</TextBody>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<GridContainer columns="two" className="md:grid-cols-2">
								<Input
									label={"Your Name"}
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									placeholder="Enter your full name"
									required
								/>
								<Input
									label={"Email Address"}
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Enter your email"
									required
								/>
							</GridContainer>
							<Input
								label={"Subject"}
								type="text"
								name="subject"
								value={formData.subject}
								onChange={handleInputChange}
								placeholder="What's this about?"
								className="w-full"
								required
							/>

							<div>
								<label className="block text-sm font-medium text-primary mb-2">
									Message
								</label>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									rows={6}
									className="w-full px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
									placeholder="Tell us how we can help you..."
									required
								/>
							</div>

							<Button type="submit" className="btn-block">
								<span className="flex items-center justify-center gap-2">
									Send Message
									<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
								</span>
							</Button>
						</form>
					</Card>

					{/* Contact Image */}
					<div className="relative group">
						<HoverImage
							src={assets.contact_img}
							alt="Contact us"
							className="rounded-2xl shadow-2xl"
						/>
						<ImageOverlay variant="card"></ImageOverlay>
					</div>
				</GridContainer>

				{/* Contact Information Grid */}
				<SectionHeader
					label="REACH OUT TO US"
					heading="Get in Touch"
					description="Multiple ways to connect with us. Choose what works best for you."
				/>

				<GridContainer columns="four" className="mb-20">
					{contactInfo.map((info, index) => (
						<div key={index} className="group">
							<HoverIconContainer className="bg-base-100 border-base-300/50 p-6 h-full hover:border-primary/20 text-center">
								<IconBaseContainer className="w-16 h-16 bg-gradient-to-br from-base-200 to-base-300 border-base-300/70 mb-4">
									<info.icon className={`w-8 h-8 ${info.color}`} />
								</IconBaseContainer>
								<H5 className="mb-3">{info.title}</H5>
								<div className="space-y-1">
									{info.details.map((detail, idx) => (
										<TextBody variant="small" key={idx}>
											{detail}
										</TextBody>
									))}
								</div>
							</HoverIconContainer>
						</div>
					))}
				</GridContainer>

				{/* Department Cards */}
				<SectionHeader
					label="DEPARTMENTS"
					heading="Contact the Right Team"
					description="Get connected with the right department for faster, more accurate
						assistance."
				/>

				<GridContainer columns="features" className="mb-20">
					{departments.map((dept, index) => (
						<div key={index} className="group">
							<HoverIconContainer
								className={`bg-gradient-to-br ${dept.color} border-base-300/50 p-8 h-full hover:border-primary/20 hover:shadow-xl text-center`}
							>
								<IconBaseContainer className="w-16 h-16 bg-base-100 border-base-300/50 mb-6">
									<dept.icon className="w-8 h-8 text-primary" />
								</IconBaseContainer>
								<H4 className="mb-3">{dept.title}</H4>
								<TextBody className="mb-4 leading-relaxed">
									{dept.description}
								</TextBody>
								<a
									href={`mailto:${dept.email}`}
									className="inline-flex items-center gap-2 text-secondary font-medium hover:text-primary transition-colors duration-300"
								>
									{dept.email}
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
								</a>
							</HoverIconContainer>
						</div>
					))}
				</GridContainer>

				{/* Careers Section */}
				<GradientBackground
					type="section"
					className="rounded-2xl p-12 text-center border border-base-300/50"
				>
					<FlexContainer className="gap-3 mb-6">
						<Briefcase className="w-6 h-6 text-secondary" />
						<span className="text-secondary font-medium text-sm tracking-wider uppercase">
							JOIN OUR TEAM
						</span>
					</FlexContainer>
					<H3 className="mb-4">Careers at Anaqa</H3>
					<TextBody variant="large" className="max-w-3xl mx-auto mb-8">
						We're always looking for talented individuals to join our growing
						team. Discover exciting opportunities and help us shape the future
						of e-commerce.
					</TextBody>
					<FlexContainer className="flex-wrap gap-4 mb-8">
						{[
							{ type: "success", label: "Remote Work Available" },
							{
								type: "info",
								label: "Competitive Benefits",
							},
							{
								type: "warning",
								label: "Growth Opportunities",
							},
						].map(({ type, label }, idx) => (
							<StatusBadge
								key={idx}
								type={type}
								className="badge-xl"
								text="text-sm"
							>
								{label}
							</StatusBadge>
						))}
					</FlexContainer>
					<Button>
						<span className="flex items-center gap-2">
							Explore Jobs
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
						</span>
					</Button>
				</GradientBackground>
			</Container>
		</GradientBackground>
	);
};

const contactInfo = [
	{
		icon: MapPin,
		title: "Visit Our Store",
		details: [
			"1234, Random Street",
			"Gorakhpur, Uttar Pradesh",
			"India - 273001",
		],
		color: "text-error",
	},
	{
		icon: Phone,
		title: "Call Us",
		details: ["+91 123-456-7890", "+91 098-765-4321"],
		color: "text-success",
	},
	{
		icon: Mail,
		title: "Email Us",
		details: ["owner@anaqa.com", "support@anaqa.com"],
		color: "text-info",
	},
	{
		icon: Clock,
		title: "Business Hours",
		details: [
			"Mon - Fri: 9:00 AM - 6:00 PM",
			"Sat: 10:00 AM - 4:00 PM",
			"Sun: Closed",
		],
		color: "text-warning",
	},
];

const departments = [
	{
		icon: MessageCircle,
		title: "Customer Support",
		description: "Get help with orders, returns, and product questions",
		email: "support@anaqa.com",
		color: "from-info/5 to-info/10",
	},
	{
		icon: Briefcase,
		title: "Business Inquiries",
		description: "Partnership opportunities and wholesale inquiries",
		email: "business@anaqa.com",
		color: "from-secondary/5 to-secondary/10",
	},
	{
		icon: Users,
		title: "Careers",
		description: "Join our team and grow with us",
		email: "careers@anaqa.com",
		color: "from-success/5 to-success/10",
	},
];

export default Contact;
