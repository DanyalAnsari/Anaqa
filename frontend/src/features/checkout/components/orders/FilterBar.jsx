import Button from "@/components/common/Buttons";
import Card from "@/components/common/Card";
import { Select } from "@/components/common/Input";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { Filter, RefreshCw } from "lucide-react";
import React from "react";

const FilterBar = ({ filterStatus, setFilterStatus, refetch, isLoading }) => {
	return (
		<Card interactive={false} variant="minimal" className="p-6 mb-8">
			<FlexContainer justify="between" className="gap-2">
				<Select
					value={filterStatus}
					onChange={(e) => setFilterStatus(e.target.value)}
					label={
						<FlexContainer className="gap-2">
							<Filter className="w-4 h-4 text-neutral" />
							<span className="hidden sm:inline">Filter by:</span>
						</FlexContainer>
					}
					options={[
						{
							label: "All Orders",
							value: "all",
						},
						{
							label: "Pending",
							value: "pending",
						},
						{
							label: "Processing",
							value: "processing",
						},
						{
							label: "Shipped",
							value: "shipped",
						},
						{
							label: "Delivered",
							value: "delivered",
						},
						{
							label: "Cancelled",
							value: "cancelled",
						},
					]}
				/>
				<Button
					variant="outline"
					action={() => refetch()}
					className={`btn-xs sm:btn-sm ${isLoading ? "loading" : ""}`}
					disabled={isLoading}
				>
					{!isLoading && <RefreshCw className="w-4 h-4" />}
					<span className="hidden sm:inline">Refresh</span>
				</Button>
			</FlexContainer>
		</Card>
	);
};

export default FilterBar;
