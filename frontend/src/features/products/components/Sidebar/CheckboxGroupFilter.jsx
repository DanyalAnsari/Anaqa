import useProductState from "@/app/hooks/useProductState";
import { FilterInputsContainer } from "@/components/layouts/containers/Container";
import React from "react";

const CheckboxGroupFilter = ({ title, values }) => {
	const { category, subCategory, setCategory, setSubCategory } =
		useProductState();

	const handleCheckboxChange = (value) => {
		title === "Category" ? setCategory(value) : setSubCategory(value);
	};

	const isChecked = (value) => {
		const targetArray = title === "Category" ? category : subCategory;
		return targetArray.includes(value.toLowerCase());
	};

	return (
		<FilterInputsContainer title={title}>
			<div className="space-y-2">
				{values.map((value) => (
					<label key={value} className="label flex items-center gap-3 group">
						<input
							type="checkbox"
							name={title}
							checked={isChecked(value)}
							onChange={()=>handleCheckboxChange(value.toLowerCase())}
							className="checkbox checkbox-xs rounded bg-base-100"
						/>
						<span className="text-neutral group-hover:text-primary transition-colors">
							{value}
						</span>
					</label>
				))}
			</div>
		</FilterInputsContainer>
	);
};

export default CheckboxGroupFilter;
