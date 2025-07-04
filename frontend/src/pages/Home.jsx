import GradientBackground from "@/components/layouts/containers/Gradients";
import Hero from "@/components/UI/Hero/Hero";
import Policy from "@/components/UI/Policy";
import ProductsTab from "@/components/UI/Tab/ProductsTab";
import QuickCategories from "@/components/UI/QuickCategories";
import SecondaryFeatures from "@/components/UI/SecondaryFeatures";
import React from "react";

const Home = () => {
	return (
		<>
			<GradientBackground>
				<Hero />
				<SecondaryFeatures />
				<QuickCategories />
			</GradientBackground>
			<ProductsTab />
			<Policy />
		</>
	);
};

export default Home;
