import Button from "@/components/common/Buttons";
import { StarRating, StarRatingInput } from "@/components/common/Input";
import { Avatar } from "@/components/common/typography/Badge";
import { H3, H4, H6 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";
import {
	FlexContainer,
	GridContainer,
} from "@/components/layouts/containers/Container";
import {
	Star,
	Truck,
	MessageSquare,
	Zap,
	CheckCircle,
	Package,
	Gauge,
} from "lucide-react";

export const DescriptionTab = ({ product }) => {
	return (
		<div className="space-y-6">
			<H4>Product Description</H4>
			<TextBody className={"leading-relaxed"}>{product.description}</TextBody>

			<GridContainer columns="two" className="md:grid-cols-2 gap-8">
				<div>
					<H6 className="mb-3">Features</H6>
					<ul className="text-neutral space-y-2">
						{[
							"Premium quality fabric",
							"Comfortable fit",
							"Durable construction",
							"Easy to maintain",
						].map((label) => (
							<li key={label} className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-success" />
								{label}
							</li>
						))}
					</ul>
				</div>
				<div>
					<H6 className="mb-3">Specifications</H6>
					<ul className="text-neutral space-y-2">
						{[
							["Material", "Cotton blend"],
							["Fit", "Slim tapered"],
							["Care", "Machine washable"],
							["Origin", "Made in India"],
						].map(([key, value]) => (
							<li key={key}>
								<strong>{key}:</strong> {value}
							</li>
						))}
					</ul>
				</div>
			</GridContainer>
		</div>
	);
};

export const ReviewsTab = ({ product, reviews }) => {
	return (
		<div className="space-y-6">
			<FlexContainer justify="between">
				<H4>Customer Reviews</H4>
				<Button variant="secondary">
					<MessageSquare className="w-4 h-4 mr-2" />
					Write Review
				</Button>
			</FlexContainer>

			{/* Review Summary */}
			<div className="bg-base-200/50 rounded-xl p-6 border border-base-300/30">
				<div className="flex items-center gap-4">
					<div className="text-center">
						<H3>{product.rating}</H3>
						<StarRatingInput
							maxRating={5}
							rating={3}
							name={`${product.name}-rating`}
						/>
						<TextBody variant="small">{product.reviews} reviews</TextBody>
					</div>
					<div className="flex-1">
						<div className="space-y-2">
							{[5, 4, 3, 2, 1].map((stars) => (
								<FlexContainer key={stars} className="gap-2">
									<TextBody variant="small" className="w-4">
										{stars}
									</TextBody>
									<Star className="w-3 h-3 text-warning" />
									<div className="flex-1 bg-base-300 rounded-full h-2">
										<div
											className="bg-warning h-2 rounded-full"
											style={{ width: `${Math.random() * 100}%` }}
										></div>
									</div>
								</FlexContainer>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Individual Reviews */}
			<div className="space-y-4">
				{reviews.map((review) => (
					<div
						key={review.id}
						className="p-6 bg-base-200/50 rounded-xl border border-base-300/30"
					>
						<FlexContainer justify="between" className="mb-3">
							<FlexContainer className="gap-3">
								<Avatar>{review.user.charAt(0)}</Avatar>
								<div>
									<FlexContainer className="gap-2">
										<H6>{review.user}</H6>
										{review.verified && (
											<CheckCircle className="w-4 h-4 text-success" />
										)}
									</FlexContainer>
									<StarRating
										rating={review.rating}
										name={`${review.id}`}
										size="xs"
									/>
								</div>
							</FlexContainer>
							<TextBody variant="small">{review.date}</TextBody>
						</FlexContainer>
						<TextBody className="leading-relaxed">{review.comment}</TextBody>
					</div>
				))}
			</div>
		</div>
	);
};

export const ShippingTab = () => {
	const options = [
		[
			{
				icon: Truck,
				color: "text-accent",
				label: "Standard Shipping",
				text: ["5-7 business days", "Free on orders over $50"],
			},
			{
				icon: Zap,
				color: "text-warning",
				label: "Express Shipping",
				text: ["2-3 business days", "$9.99"],
			},
		],
		[
			{
				icon: Gauge,
				color: "text-error",
				label: "Next Day Delivery",
				text: ["1 business day", "Free on orders over $50"],
			},
			{
				icon: Package,
				color: "text-success",
				label: "Store Pickup",
				text: ["Ready in 2-4 hours", "Free"],
			},
		],
	];

	const ShippingCard = ({ items }) => {
		return (
			<div className="space-y-4">
				{items.map((item) => (
					<div className="p-4 bg-base-200/50 rounded-xl border border-base-300/30">
						<FlexContainer justify="start" className="gap-3 mb-2">
							<Truck className={`w-5 h-5 ${item.color}`} />
							<H6>{item.label}</H6>
						</FlexContainer>
						<TextBody>{item.text[0]}</TextBody>
						<TextBody variant="small">{item.text[1]}</TextBody>
					</div>
				))}
			</div>
		);
	};
	return (
		<div className="space-y-6">
			<H4>Shipping Information</H4>
			<GridContainer columns="two" className="md:grid-cols-2">
				<ShippingCard items={options[0]} />
				<ShippingCard items={options[1]} />
			</GridContainer>
		</div>
	);
};

export const CareTab = () => {
	return (
		<div className="space-y-6">
			<H4>Care Instructions</H4>
			<GridContainer columns="two" className="md:grid-cols-2 gap-8">
				<div>
					<H6 className="mb-3">Washing</H6>
					<ul className="text-neutral space-y-2">
						{[
							"Machine wash in cold water",
							"Use mild detergent",
							"Use mild detergent",
							"Wash similar colors together",
						].map((label) => (
							<li key={label} className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-success" />
								{label}
							</li>
						))}
					</ul>
				</div>
				<div>
					<H6 className="mb-3">Drying & Storage</H6>
					<ul className="text-neutral space-y-2">
						{[
							"Tumble dry on low heat",
							"Iron on medium heat if needed",
							"Store in cool, dry place",
						].map((label) => (
							<li key={label} className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-success" />
								{label}
							</li>
						))}
					</ul>
				</div>
			</GridContainer>
		</div>
	);
};
