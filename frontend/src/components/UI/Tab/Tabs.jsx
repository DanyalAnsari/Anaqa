import React from "react";
import { useProductWidget } from "@/app/hooks/useProducts";
import { SectionHeader } from "@/components/common/Headers";
import ProductsGridContainer from "@/features/products/components/Card/ProductsGridContainer";

export const LatestProductsSection = () => {
	const { isError, isLoading, error, products } = useProductWidget({
		sort: "-createdAt",
		limit: 8,
	});

	return (
		<div className="w-full">
			<SectionHeader
				variant="sub"
				label="New Arrivals"
				heading="Latest Arrivals"
				description="Fresh styles just landed be the first to discover them"
			/>
			<ProductsGridContainer
				isError={isError}
				error={error}
				isLoading={isLoading}
				products={products}
			/>
		</div>
	);
};

export const BestsellingProductSection = () => {
	const { isError, isLoading, error, products } = useProductWidget({
		bestseller: true,
		sort: "-createdAt",
		limit: 8,
	});

	return (
		<div className="w-full">
			<SectionHeader
				variant="subSuccess"
				label="Customer Favorites"
				heading="Best Sellers"
				description="Our most loved pieces that customers can't get enough of"
			/>

			<ProductsGridContainer
				isError={isError}
				error={error}
				isLoading={isLoading}
				products={products}
			/>
		</div>
	);
};

export const FeaturedProductSection = () => {
	const { isError, isLoading, error, products } = useProductWidget({
		featured: true,
		sort: "-createdAt",
		limit: 8,
	});

	return (
		<div className="w-full">
			<SectionHeader
				variant="subSuccess"
				label="Premium Goods"
				heading="Featured Products"
				description="Discover premium fashion and aesthetic style with us"
			/>

			<ProductsGridContainer
				isError={isError}
				error={error}
				isLoading={isLoading}
				products={products}
			/>
		</div>
	);
};
