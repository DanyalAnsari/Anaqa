import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null,
	token: localStorage.getItem("token") || null,
};

// Update initial auth state based on localStorage
if (initialState.token && initialState.user) {
	initialState.isAuthenticated = true;
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		},
	},
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
