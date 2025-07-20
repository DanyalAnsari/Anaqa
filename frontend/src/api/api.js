import { logout, setToken } from "@/features/auth/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL}/api`,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const RootState = getState();
		const { token } = RootState.auth;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		if (import.meta.env.PROD) {
			headers.set("Origin", "https://anaqa-two.vercel.app");
		}
		headers.set("Content-Type", "application/json");

		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	// If 401, try refreshing token
	if (result.error?.status === 401) {
		try {
			const refreshResult = await baseQuery(
				{ url: "/auth/refresh", method: "GET" },
				api,
				extraOptions
			);
			const token = refreshResult.data?.token;

			if (token) {
				api.dispatch(setToken(token));
				result = await baseQuery(args, api, extraOptions);
			} else {
				api.dispatch(logout());
			}
		} catch (error) {
			console.log(error);
			if (error?.status === 401) {
				toast.error("Session expired! Login again");
			}
		}
	}
	return result;
};

const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: ["User", "Cart", "Product", "Order"],
});

export default baseApi;
