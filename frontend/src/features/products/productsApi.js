import baseApi from "@/api/api";
import {
	buildProductQueryParams,
	buildUrlParams,
} from "@/utilities/productUtils";

// Define product-related API endpoints
export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Get all products with filtering, pagination, sorting
		getProducts: builder.query({
			query: (params = {}) => {
				// Construct query string from params
				const processedParams = buildProductQueryParams(params);

				return `/products/?${buildUrlParams(processedParams)}`;
			},
			keepUnusedDataFor: 60,
			providesTags: (result) => {
				return result && result.data
					? [
							...result.data.map(({ _id }) => ({
								type: "Product",
								id: _id,
							})),
							{ type: "Product", id: "LIST" },
					  ]
					: [{ type: "Product", id: "LIST" }];
			},
		}),

		// Get single product by ID or slug
		getProduct: builder.query({
			query: (productId) => `/products/${productId}`,
			providesTags: (result) => {
				return result && result.data
					? [{ type: "Product", id: result.data._id }]
					: [];
			},
		}),

		// Create new product (protected)
		createProduct: builder.mutation({
			query: (productData) => ({
				url: "/products",
				method: "POST",
				body: productData,
			}),
			invalidatesTags: [{ type: "Product", id: "LIST" }],
		}),

		// Update product (protected)
		updateProduct: builder.mutation({
			query: ({ productId, ...updateData }) => ({
				url: `/products/${productId}`,
				method: "PATCH",
				body: updateData,
			}),
			invalidatesTags: (result) =>
				result && result.data
					? [{ type: "Product", id: result.data.product._id }]
					: [],
		}),

		// Delete product (protected)
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `/products/${productId}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Product", id: "LIST" }],
		}),
	}),
});

// Export hooks for usage in components
export const {
	useGetProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;
