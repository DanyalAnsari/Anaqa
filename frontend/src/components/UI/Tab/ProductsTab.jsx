import React from "react";
import { SectionHeader } from "@/components/common/Headers";
import {
	BestsellingProductSection,
	FeaturedProductSection,
	LatestProductsSection,
} from "./Tabs";
import GradientBackground from "@/components/layouts/containers/Gradients";
import Container, {
	SectionContainer,
} from "@/components/layouts/containers/Container";
import { Tab, TabContainer, TabContent } from "@/components/common/Input";

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
		{
			label: "Featured Products",
			component: FeaturedProductSection,
		},
	];

	return (
		<GradientBackground type="subtle">
			<SectionContainer size="large">
				<Container>
					<SectionHeader
						label={"Collections"}
						heading={"Discover Our Products"}
						description={
							"Explore our carefully curated collections featuring the latest trends and timeless classics"
						}
					/>
					{/* Enhanced Tabs */}
					<TabContainer className="mb-12">
						{Tabs.map((tab, idx) => (
							<React.Fragment key={idx}>
								<Tab
									name="product_tabs"
									aria-label={tab.label}
									defaultChecked={idx === 0}
								/>
								<TabContent>
									<tab.component />
								</TabContent>
							</React.Fragment>
						))}
					</TabContainer>
				</Container>
			</SectionContainer>
		</GradientBackground>
	);
};

export default ProductsTab;
