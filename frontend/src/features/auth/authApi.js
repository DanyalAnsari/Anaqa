import baseApi from "../../api/api";
import { login as loginAction } from "@/features/auth/authSlice";

// Define auth-related API endpoints
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Login user
		login: builder.mutation({
			query: (credentials) => ({
				url: "/auth/signin",
				method: "POST",
				body: credentials,
			}),
			// Handle successful login
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				try {
					const { data } = await queryFulfilled;
					// Store token and user info in localStorage
					if (data.token) {
						dispatch(loginAction({ token: data.token, user: data.user }));
					}
				} catch (error) {
					console.error("Login failed:", error);
				}
			},
			invalidatesTags: ["User"],
		}),

		// Register user
		register: builder.mutation({
			query: (userData) => ({
				url: "/auth/signup",
				method: "POST",
				body: userData,
			}),
			// Handle successful registration
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					// Store token and user info in localStorage
					if (data.token) {
						localStorage.setItem("token", data.token);
					}
				} catch (error) {
					console.error("Registration failed:", error);
				}
			},
			invalidatesTags: ["User"],
		}),
	}),
});

// Export hooks for usage in components
export const { useLoginMutation, useRegisterMutation } = authApi;

// Helper functions for auth
export const authHelpers = {
	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		// Force refresh cached queries
		baseApi.util.resetApiState();
	},

	isAuthenticated: () => {
		return !!localStorage.getItem("token");
	},
};
