import useProductState from "@/app/hooks/useProductState";
import { Input } from "@/components/common/Input";
import { FilterInputsContainer, FlexContainer } from "@/components/layouts/containers/Container";
import React from "react";

const PriceInput = () => {
	const { price, setPriceRange } = useProductState();
	const minPrice = price[0];
	const maxPrice = price[1];

	const handlePriceInput = (e) => {
		const { name, value } = e.target;
		setPriceRange(name === "min" ? [value, maxPrice] : [minPrice, value]);
	};

	return (
		<FilterInputsContainer title="Price Range">
			<div className="space-y-3">
				<FlexContainer align="center" className="gap-2">
					<Input
						label="Minimum"
						type="number"
						name="min"
						placeholder="0"
						value={minPrice}
						onChange={handlePriceInput}
					/>
					<span className="text-neutral">-</span>
					<Input
						label="Maximum"
						type="number"
						name="max"
						placeholder="Max"
						value={maxPrice}
						onChange={handlePriceInput}
					/>
				</FlexContainer>
			</div>
		</FilterInputsContainer>
	);
};

export default PriceInput;
