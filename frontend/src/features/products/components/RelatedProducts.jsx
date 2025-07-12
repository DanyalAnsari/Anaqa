import React from "react";
import { SectionHeader } from "@/components/common/Headers";
import ProductsGridContainer from "@/features/products/components/Card/ProductsGridContainer";

const RelatedProducts = ({ products }) => (
	<div className="space-y-8">
		<SectionHeader label={"SIMILAR ITEMS"} heading={"You Might Also Like"} />

		<ProductsGridContainer products={products} />
	</div>
);

export default RelatedProducts;
