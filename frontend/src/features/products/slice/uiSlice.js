import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showFilter: false,
	viewMode: "grid",
	selectedImage: 0,
	showQuickView: false,
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
		setShowQuickView: (state, action) => {
			state.showQuickView = action.payload;
		},
		setSelectedImage: (state, action) => {
			state.selectedImage = action.payload;
		},
	},
});

export default uiSlice.reducer;

export const {
	setShowFilter,
	setViewMode,
	setSelectedImage,
	setShowQuickView,
} = uiSlice.actions;

export const selectShowFilter = (state) => state.ui.showFilter;
export const selectViewMode = (state) => state.ui.viewMode;
export const selectShowQuickView = (state) => state.ui.showQuickView;
export const selectSelectedImage = (state) => state.ui.selectedImage;
