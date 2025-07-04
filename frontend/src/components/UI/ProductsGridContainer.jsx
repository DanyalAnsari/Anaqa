import React from "react";
import ProductCard from "./ProductCard";
import { FlexContainer, GridContainer } from "../layouts/containers/Container";
import { LoadingSpinner, MessageBox } from "../common/typography/LoadingComp";
import { TextBody } from "../common/typography/Text";

const ProductsGridContainer = ({
	products = [],
	isLoading = false,
	isError = false,
	error = null,
	emptyMessage = "No products found",
	className = "",
}) => {
	if (isLoading) {
		return <LoadingBox message={"Loading Products..."} />;
	}

	if (isError) {
		return (
			<MessageBox
				style="error"
				message="Oops! Something went wrong"
				description={
					error?.data?.message ||
					"Unable to load products. Please try again later."
				}
			>
				⚠️
			</MessageBox>
		);
	}

	if (!products || products.length === 0) {
		return (
			<MessageBox message="No Products Found" description={emptyMessage}>
				📦
			</MessageBox>
		);
	}

	return (
		<GridContainer className={`${className}`}>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</GridContainer>
	);
};

const LoadingBox = ({ message }) => (
	<FlexContainer className="w-full py-16">
		<FlexContainer className="flex-col gap-4">
			<LoadingSpinner />
			<TextBody className="font-medium">{message}</TextBody>
		</FlexContainer>
	</FlexContainer>
);

export default ProductsGridContainer;
