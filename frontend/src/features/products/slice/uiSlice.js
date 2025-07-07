import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showFilter: false,
	viewMode: "grid",
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setShowFilter: (state, action) => {
			state.showFilter = action.payload;
		},
		setViewMode: (state, action) => {
			state.viewMode = action.payload;
		},
	},
});

export default uiSlice.reducer;

export const { setShowFilter, setViewMode } = uiSlice.actions;

export const selectShowFilter = (state) => state.ui.showFilter;
export const selectViewMode = (state) => state.ui.viewMode;
