import { products } from "@/assets/assets";
import React from "react";
import ProductsList from "./ProductsList";
import Title from "../common/Title";

const ProductsTab = () => {
	const Tabs = [
		{
			label: "Latest Products",
			component: LatestProductsSection,
		},
		{
			label: "Bestselling Products",
			component: BestsellingProductSection,
		},
	];
	return (
		<div className="py-8 max-w-6xl mx-auto px-4">
			<div role="tablist" className="tabs tabs-border">
				{Tabs.map((tab, idx) => (
					<React.Fragment key={idx}>
						<input
							type="radio"
							name="product_tabs"
							role="tab"
							className="tab font-medium text-sm"
							aria-label={tab.label}
							defaultChecked={idx === 0}
						/>
						<div role="tabpanel" className="tab-content py-6">
							<tab.component />
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

const LatestProductsSection = () => {
	let productList = products.sort((a, b) => b.date - a.date);
	productList = productList.slice(0, 8);
	return (
		<div className="w-full flex flex-col gap-4 bg-base-100 p-4">
			<div className="flex flex-col gap-2">
				<Title text1={"LATEST"} text2={"ARRIVALS"} />
				<p className="text-gray-500 text-sm">Check out our newest arrivals.</p>
			</div>

			<ProductsList products={productList} className="py-4" />
		</div>
	);
};
const BestsellingProductSection = () => {
	let productList = products.filter((product) => product.bestseller);
    productList=productList.slice(0,8);
	return (
		<div className="w-full flex flex-col gap-4 bg-base-100 p-4">
			<div className="flex flex-col gap-2">
				<Title text1={"BEST"} text2={"SELLERS"} />
				<p className="text-gray-500 text-sm">
					Our most popular products that customers love.
				</p>
			</div>

			<ProductsList products={productList} className="py-4" />
		</div>
	);
};

export default ProductsTab;
