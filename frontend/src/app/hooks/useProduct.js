import React from "react";
import { useGetProductQuery } from "@/features/products/productsApi";
import { formatProductData } from "@/utilities/productUtils";

export const useProduct = (productId) => {
	const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
		useGetProductQuery(productId);

	const product = data?.data ? formatProductData(data.data) : null;

	return {
		// Data
		product,
		isLoading: isLoading || isFetching,
		isSuccess,
		isError,
		error,

		// Methods
		refetch,
	};
};
