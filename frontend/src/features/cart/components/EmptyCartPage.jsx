import Button from "@/components/common/Buttons";
import { H2 } from "@/components/common/typography/Headings";
import { LoadingSpinner } from "@/components/common/typography/LoadingComp";
import { TextBody } from "@/components/common/typography/Text";
import Container, {
	FlexContainer,
} from "@/components/layouts/containers/Container";
import GradientBackground from "@/components/layouts/containers/Gradients";
import { ArrowRight, ShoppingBag } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const EmptyCartPage = () => {
	const navigate = useNavigate();

	return (
		<GradientBackground type="section" className="min-h-screen py-20">
			<Container>
				{console.log("inside")}
				<div className="text-center">
					<FlexContainer className="w-32 h-32 bg-base-200 rounded-full mx-auto mb-8">
						<ShoppingBag className="w-16 h-16 text-neutral" />
					</FlexContainer>
					<H2 className="text-4xl font-bold text-primary mb-4">
						Your Cart is Empty
					</H2>
					<TextBody variant="large" className="mb-8 max-w-md mx-auto">
						Looks like you haven't added any items to your cart yet. Let's go
						shopping!
					</TextBody>
					<Button action={() => navigate("/products")}>
						Continue Shopping
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</Container>
		</GradientBackground>
	);
};

export const LoadingComponent = () => {
	return (
		<GradientBackground
			type="section"
			className="min-h-screen flex items-center justify-center"
		>
			<LoadingSpinner />
		</GradientBackground>
	);
};

export default EmptyCartPage;
