import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFilterCount } from "@/features/products/slice/filterSlice";
import {
	selectSelectedImage,
	selectShowFilter,
	selectViewMode,
	setSelectedImage,
	setShowFilter,
	setViewMode,
} from "@/features/products/slice/uiSlice";

const useUiState = () => {
	const dispatch = useDispatch();
	const showFilter = useSelector(selectShowFilter);
	const viewMode = useSelector(selectViewMode);

	const selectedImage = useSelector(selectSelectedImage);
	const activeFiltersCount = useSelector(selectActiveFilterCount);

	const handleShowFilter = (value) => {
		dispatch(setShowFilter(Boolean(value)));
	};

	const handleViewMode = (value) => {
		dispatch(setViewMode(String(value)));
	};

	const handleSetSelectedImage = (value) => {
		dispatch(setSelectedImage(Number(value)));
	};

	return {
		showFilter,
		viewMode,
		selectedImage,
		activeFiltersCount,
		changeSelectedImage: handleSetSelectedImage,
		toggleShowFilter: handleShowFilter,
		updateViewMode: handleViewMode,
	};
};

export default useUiState;
