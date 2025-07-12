import { useMemo } from "react";
import { useGetProductsQuery } from "@/features/products/productsApi";
import {
	buildProductQueryParams,
	formatProductData,
} from "@/utilities/productUtils";
import useProductState from "./useProductState";

const formatProductResponse = (data) => {
	if (!data?.data) return [];
	return data.data.map(formatProductData);
};

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
	const products = useMemo(() => formatProductResponse(data), [data]);

	// Extract pagination info
	const pagination = data?.pagination || { total: 0, page: 1, pages: 1 };

	return {
		products,
		pagination,
		filters,
		isLoading: isLoading || isFetching,
		isSuccess,
		isError,
		error,
		refetch,
	};
};

export const useProductWidget = (initialFilters = {}) => {
	// Build query params from filters
	const queryParams = useMemo(
		() => buildProductQueryParams(initialFilters),
		[initialFilters]
	);

	// Fetch products with RTK Query
	const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
		useGetProductsQuery(queryParams);

	// Format products data
	const products = useMemo(() => formatProductResponse(data), [data]);

	return {
		// Data
		products,
		isLoading: isLoading || isFetching,
		isSuccess,
		isError,
		error,

		// Methods
		refetch,
	};
};
