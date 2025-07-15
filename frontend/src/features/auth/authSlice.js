import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null,
	token: null,
	expiresIn: null,
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
			state.token = action.payload.token.accessToken;
			state.expiresIn = action.payload.token.expiresIn;
			localStorage.setItem("user", JSON.stringify(action.payload.user));
		},
		setToken: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload.accessToken;
			state.expiresIn = action.payload.expiresIn;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.expiresIn = null;
			localStorage.removeItem("user");
		},
	},
});

export default authSlice.reducer;

export const { login, logout, setToken } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
