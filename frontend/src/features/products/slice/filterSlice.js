import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
	search: "",
	price: [0, 1000],
	category: [],
	subCategory: [],
	sort: "",
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		toggleFilterItem: (state, action) => {
			const { key, value } = action.payload;
			const currentArray = state[key];

			if (!Array.isArray(currentArray)) return;

			const index = currentArray.indexOf(value);
			if (index === -1) {
				currentArray.push(value);
			} else {
				currentArray.splice(index, 1);
			}
		},
		updateFilter: (state, action) => {
			const { key, value } = action.payload;
			state[key] = value;
		},
		resetFilter: () => {
			return initialState;
		},
	},
});

export default filterSlice.reducer;

export const {
	setActiveFiltersCount,
	toggleFilterItem,
	updateFilter,
	resetFilter,
} = filterSlice.actions;

export const selectFilter = (state) => state.filter;
export const selectCategories = (state) => state.filter.category;
export const selectSubCategories = (state) => state.filter.subCategory;
export const selectPrice = (state) => state.filter.price;
export const selectSort = (state) => state.filter.sort;
export const selectSearchTerm = (state) => state.filter.search;

export const selectActiveFilterCount = createSelector(
	[selectFilter],
	(filters) => {
		let count = 0;

		const [min, max] = filters.price;

		if (filters.category.length > 0) count += filters.category.length;
		if (filters.subCategory.length > 0) count += filters.subCategory.length;
		if (filters.search.trim() !== "") count += 1;
		if (!(min === 0 && max === 1000)) count += 1;

		return count;
	}
);
