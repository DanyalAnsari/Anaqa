import baseApi from "@/api/api";

// Define cart-related API endpoints
export const cartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Get user's cart
		getCart: builder.query({
			query: () => "/cart/",
			providesTags: ["Cart"],
		}),

		// Add item to cart
		addToCart: builder.mutation({
			query: (data) => ({
				url: "/cart/add",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),

		// Update cart item
		updateCartItem: builder.mutation({
			query: (data) => ({
				url: "/cart/update",
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),

		// Remove from cart
		removeFromCart: builder.mutation({
			query: (data) => ({
				url: "cart/remove",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),

		// Clear cart
		clearCart: builder.mutation({
			query: () => ({
				url: "/cart/clear",
				method: "DELETE",
			}),
			invalidatesTags: ["Cart"],
		}),
	}),
});

// Export hooks for usage in components
export const {
	useGetCartQuery,
	useAddToCartMutation,
	useUpdateCartItemMutation,
	useRemoveFromCartMutation,
	useClearCartMutation,
} = cartApi;
