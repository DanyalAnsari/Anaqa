import { useMemo } from "react";
import { useGetProductQuery } from "@/features/products/productsApi";
import { formatProductData } from "@/utilities/productUtils";

export const useProduct = (productId) => {
	// Fetch product with RTK Query
	// const {}=useGetProductQuery(productId)
	const { data, isLoading, isSuccess, isError, error, refetch } =
		useGetProductQuery(productId);

	//   // Get cart methods to check if product is in cart
	//   const { isInCart, getQuantity, addToCart } = useCart();

	console.log(data);

	// Format product data
	const product = useMemo(() => {
		if (!data?.data) return null;
		return formatProductData(data.data);
	}, [data]);

	// Get similar products (placeholder for future implementation)
	const similarProducts = useMemo(() => {
		// This would be implemented with another API call in a real app
		return [];
	}, []);

	// Check if product is in cart
	// const inCart = useMemo(() => {
	// 	if (!product) return false;
	// 	return isInCart(product.id);
	// }, [product, isInCart]);

	// Get quantity in cart
	// const quantityInCart = useMemo(() => {
	// 	if (!product) return 0;
	// 	return getQuantity(product.id);
	// }, [product, getQuantity]);

	// Add to cart helper
	// const handleAddToCart = (quantity = 1) => {
	// 	if (!product) return;
	// 	addToCart(product.id, quantity);
	// };

	return {
		// Data
		product,
		similarProducts,
		isLoading,
		isSuccess,
		isError,
		error,

		// Methods
		refetch,
	};
};
