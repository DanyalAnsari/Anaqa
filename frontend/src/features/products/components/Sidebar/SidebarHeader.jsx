import React from "react";
import useUiState from "@/app/hooks/useUiState";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { CardTitle } from "@/components/common/Card";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import Button from "@/components/common/Buttons";
import { StatusBadge } from "@/components/common/typography/Badge";
import useProductState from "@/app/hooks/useProductState";

const SidebarHeader = () => {
	const { showFilter, activeFiltersCount, toggleShowFilter } = useUiState();
	const { resetFilters } = useProductState();

	return (
		<FlexContainer justify="between" className="mb-6">
			<CardTitle className="flex items-center gap-2">
				<SlidersHorizontal className="w-5 h-5" />
				Filters
				{activeFiltersCount > 0 && (
					<StatusBadge type="secondary">{activeFiltersCount}</StatusBadge>
				)}
			</CardTitle>
			<FlexContainer justify="start" className="gap-2">
				{activeFiltersCount > 0 && (
					<Button
						variant="small"
						action={() => resetFilters()}
						className="text-error hover:text-error"
					>
						Clear All
					</Button>
				)}
				<Button
					variant="small"
					action={() => toggleShowFilter(!showFilter)}
					className="lg:hidden"
				>
					<ChevronDown
						className={`w-4 h-4 transition-transform ${
							showFilter ? "rotate-180" : ""
						}`}
					/>
				</Button>
			</FlexContainer>
		</FlexContainer>
	);
};

export default SidebarHeader;
