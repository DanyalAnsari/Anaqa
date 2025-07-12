import { TabContainer } from "@/components/common/Input";
import React, { useState } from "react";
import { CareTab, DescriptionTab, ReviewsTab, ShippingTab } from "./ProductInfoTabs";

const ProductInfoTab = ({ product, reviews }) => {
	const [activeTab, setActiveTab] = useState("description");

	return (
		<div className="space-y-6">
			{/* Tab Navigation */}
			<TabContainer>
				{[
					{ id: "description", label: "Description" },
					{ id: "reviews", label: `Reviews (${reviews.length})` },
					{ id: "shipping", label: "Shipping Info" },
					{ id: "care", label: "Care Guide" },
				].map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
							activeTab === tab.id
								? "bg-primary text-primary-content shadow-lg"
								: "text-neutral hover:bg-base-200"
						}`}
					>
						{tab.label}
					</button>
				))}
			</TabContainer>

			{/* Tab Content */}
			<div className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300/50">
				{activeTab === "description" && <DescriptionTab product={product} />}

				{activeTab === "reviews" && <ReviewsTab product={product} reviews={reviews} />}

				{activeTab === "shipping" && <ShippingTab />}

				{activeTab === "care" && <CareTab />}
			</div>
		</div>
	);
};



export default ProductInfoTab;
