import baseApi from "@/api/api";

export const orderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserOrders: builder.query({
			query: () => "/orders/",
			providesTags: ["Order"],
		}),
		createOrderByCod: builder.mutation({
			query: (data) => ({
				url: "/orders/cod",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart", "Order"],
		}),
		createOrderByStripe: builder.mutation({
			query: (data) => ({
				url: "/orders/stripe",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart", "Order"],
		}),
		verifyStripePayment: builder.mutation({
			query: (data) => ({
				url: "/orders/verify",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Order"],
		}),
		getOrderById: builder.query({
			query: (id) => ({
				url: `/orders/${id}`,
				method: "GET",
			}),
			providesTags: ["Order"],
		}),
		updateOrderPayment: builder.mutation({
			query: ({ id, data }) => ({
				url: `/orders/${id}/pay`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Order"],
		}),
	}),
});

export const {
	useGetUserOrdersQuery,
	useCreateOrderByCodMutation,
	useCreateOrderByStripeMutation,
	useVerifyStripePaymentMutation,
	useGetOrderByIdQuery,
	useUpdateOrderPaymentMutation,
} = orderApi;
