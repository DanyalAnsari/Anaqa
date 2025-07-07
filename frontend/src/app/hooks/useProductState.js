import React from "react";
import {
	resetFilter,
	selectCategories,
	selectPrice,
	selectSearchTerm,
	selectSort,
	selectSubCategories,
	toggleFilterItem,
	updateFilter,
} from "@/features/products/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const useProductState = () => {
	const dispatch = useDispatch();
	const category = useSelector(selectCategories);
	const subCategory = useSelector(selectSubCategories);
	const price = useSelector(selectPrice);
	const sort = useSelector(selectSort);
	const searchTerm = useSelector(selectSearchTerm);

	const handleSetCategories = (val) => {
		const value = String(val);
		dispatch(toggleFilterItem({ key: "category", value }));
	};

	const handleSetSubCategories = (val) => {
		const value = String(val);
		dispatch(toggleFilterItem({ key: "subCategory", value }));
	};

	const handlePriceFilter = ([min, max]) => {
		const minPrice = Number(min);
		const maxPrice = Number(max);
		dispatch(updateFilter({ key: "price", value: [minPrice, maxPrice] }));
	};

	const handleSorting = (sortType) => {
		const sortOptions = {
			newest: "-createdAt",
			oldest: "createdAt",
			highPrice: "-price",
			lowPrice: "price",
		};
		const value = sortOptions[sortType];
		dispatch(updateFilter({ key: "sort", value }));
	};

	const handleSearchTerm = (val) => {
		const value = String(val);
		dispatch(updateFilter({ key: "search", value }));
	};

	const handleResetFilters = () => {
		dispatch(resetFilter());
	};

	return {
		category,
		subCategory,
		price,
		sort,
		searchTerm,
		toggleFilterItem,
		updateFilter,
		resetFilters: handleResetFilters,
		setCategory: handleSetCategories,
		setSubCategory: handleSetSubCategories,
		setSearch: handleSearchTerm,
		setPriceRange: handlePriceFilter,
		setSorting: handleSorting,
	};
};

export default useProductState;
