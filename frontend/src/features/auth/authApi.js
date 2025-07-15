import baseApi from "@/api/api";
import { login as loginAction, logout } from "@/features/auth/authSlice";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
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
					const { token, user } = data.data;

					// Store token and user info in localStorage
					if (token) {
						dispatch(loginAction({ token, user }));
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
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				try {
					const { data } = await queryFulfilled;
					const { token, user } = data.data;

					// Store token and user info in localStorage
					if (token) {
						dispatch(loginAction({ token, user }));
					}
				} catch (error) {
					console.error("Registration failed:", error);
				}
			},
			invalidatesTags: ["User"],
		}),

		logout: builder.query({
			query: () => "auth/logout",
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				try {
					const { data } = await queryFulfilled;

					if (data) {
						dispatch(logout());
						dispatch(baseApi.util.resetApiState());
					}
				} catch (error) {
					console.error("Registration failed:", error);
				}
			},
		}),
	}),
});

// Export hooks for usage in components
export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } =
	authApi;
