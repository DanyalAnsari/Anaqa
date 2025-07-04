import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showSearchBar: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	toggleSearchBar: (state, action) => {
		state.showSearchBar = action.payload;
	},
});

export default uiSlice.reducer;

export const { toggleSearchBar } = uiSlice.actions;

export const selectShowSearchBar = (state) => state.ui.showSearchBar;
