import { configureStore } from "@reduxjs/toolkit/react";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@/features/auth/authSlice";
import filterReducer from "@/features/products/slice/filterSlice";
import uiReducer from "@/features/products/slice/uiSlice";
import baseApi from "@/api/api";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		filter: filterReducer,
		ui: uiReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
