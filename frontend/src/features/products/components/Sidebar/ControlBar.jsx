import useProductState from "@/app/hooks/useProductState";
import useUiState from "@/app/hooks/useUiState";
import Card, { CardContent } from "@/components/common/Card";
import { Select } from "@/components/common/Input";
import { TextBody } from "@/components/common/typography/Text";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { Grid, List } from "lucide-react";
import React from "react";

const ControlBar = ({ filterProducts }) => {
	const { viewMode, updateViewMode } = useUiState();
	const { sort, setSorting } = useProductState();
	return (
		<Card variant="elevated" className="mb-8">
			<CardContent padding="small">
				<FlexContainer
					direction="column"
					justify="between"
					className="sm:flex-row gap-4"
				>
					<FlexContainer className="gap-4">
						<TextBody className="font-medium">
							{filterProducts.length}
							{filterProducts.length === 1 ? "product" : "products"}
						</TextBody>
						<FlexContainer className="gap-2">
							<IconButton
								action={() => updateViewMode("grid")}
								viewCondition={viewMode === "grid"}
							>
								<Grid className="w-4 h-4" />
							</IconButton>
							<IconButton
								action={() => updateViewMode("list")}
								className={viewMode === "list"}
							>
								<List className="w-4 h-4" />
							</IconButton>
						</FlexContainer>
					</FlexContainer>

					<Select
						value={sort}
						label={"Sort by: "}
						onChange={(e) => {
							setSorting(e.target.value);
						}}
						options={[
							{ value: "newest", label: "Newest First" },
							{ value: "oldest", label: "Oldest First" },
							{ value: "lowPrice", label: "Price: Low to High" },
							{ value: "highPrice", label: "Price: High to Low" },
						]}
					></Select>
				</FlexContainer>
			</CardContent>
		</Card>
	);
};

const IconButton = ({ viewCondition, action, children }) => {
	return (
		<button
			onClick={action}
			className={`p-2 rounded-lg transition-colors ${
				viewCondition
					? "bg-primary text-primary-content shadow-sm"
					: "bg-base-200 text-neutral hover:bg-base-300"
			}`}
		>
			{children}
		</button>
	);
};
export default ControlBar;
