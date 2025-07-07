import React from "react";
import Card, { CardContent } from "@/components/common/Card";
import { SearchInput } from "@/components/common/Input";
import useUiState from "@/app/hooks/useUiState";
import useProductState from "@/app/hooks/useProductState";
import PriceInput from "./PriceInput";
import SidebarHeader from "./SidebarHeader";
import CheckboxGroupFilter from "./CheckboxGroupFilter";

const Sidebar = () => {
	const { showFilter } = useUiState();
	const { searchTerm, setSearch } = useProductState();

	return (
		<div className="lg:w-80">
			<Card variant="elevated" className="sticky top-4">
				<CardContent>
					<SidebarHeader />
					<div
						className={`space-y-6 ${showFilter ? "block" : "hidden"} lg:block`}
					>
						{/* Search */}
						<SearchInput
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) => setSearch(e.target.value)}
						/>

						{/* Price Range */}
						<PriceInput />

						<CheckboxGroupFilter
							title="Category"
							values={["Men", "Women", "Kids"]}
						/>

						<CheckboxGroupFilter
							title="Type"
							values={["Topwear", "Bottomwear", "Winterwear"]}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Sidebar;
