import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFilterCount } from "@/features/products/slice/filterSlice";
import {
	selectShowFilter,
	selectViewMode,
	setShowFilter,
	setViewMode,
} from "@/features/products/slice/uiSlice";

const useUiState = () => {
	const dispatch = useDispatch();
	const showFilter = useSelector(selectShowFilter);
	const viewMode = useSelector(selectViewMode);
	const activeFiltersCount = useSelector(selectActiveFilterCount);

	const handleShowFilter = (value) => {
		dispatch(setShowFilter(Boolean(value)));
	};

	const handleViewMode = (value) => {
		dispatch(setViewMode(String(value)));
	};

	return {
		showFilter,
		viewMode,
		activeFiltersCount,
		toggleShowFilter: handleShowFilter,
		updateViewMode: handleViewMode,
	};
};

export default useUiState;
