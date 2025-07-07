import { useState, useMemo } from "react";
import { useGetProductsQuery } from "@/features/products/productsApi";
import {
	buildProductQueryParams,
	formatProductData,
} from "@/utilities/productUtils";
import useProductState from "./useProductState";

export const useProducts = () => {
	const { sort, category, subCategory, price, searchTerm } = useProductState();

	const filters = useMemo(
		() => ({
			category,
			subCategory,
			minPrice: price[0],
			maxPrice: price[1],
			sort,
			search: searchTerm,
			page: 1,
			limit: 12,
		}),
		[category, subCategory, price, sort, searchTerm]
	);

	// Build query params from filters
	const queryParams = useMemo(
		() => buildProductQueryParams(filters),
		[filters]
	);

	// Fetch products with RTK Query
	const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
		useGetProductsQuery(queryParams);

	// Format products data
	const formattedProducts = useMemo(() => {
		if (!data?.data) return [];
		return data.data.map((product) => formatProductData(product));
	}, [data]);

	// Extract pagination info
	const pagination = data?.pagination || { total: 0, page: 1, pages: 1 };

	return {
		// Data
		products: formattedProducts,
		pagination,
		filters,
		isLoading: isLoading || isFetching,
		isSuccess,
		isError,
		error,

		// Methods
		refetch,
	};
};

export const useProductWidget = (initialFilters = {}) => {
	const [filters] = useState(initialFilters);

	// Build query params from filters
	const queryParams = useMemo(
		() => buildProductQueryParams(filters),
		[filters]
	);

	// Fetch products with RTK Query
	const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
		useGetProductsQuery(queryParams);

	// Format products data
	const formattedProducts = useMemo(() => {
		if (!data?.data) return [];
		return data.data.map((product) => formatProductData(product));
	}, [data]);

	return {
		// Data
		products: formattedProducts,
		filters,
		isLoading: isLoading || isFetching,
		isSuccess,
		isError,
		error,

		// Methods
		refetch,
	};
};
