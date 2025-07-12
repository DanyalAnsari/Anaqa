import {
	useGetCartQuery,
	useAddToCartMutation,
	useRemoveFromCartMutation,
	useUpdateCartItemMutation,
	useClearCartMutation,
} from "@/features/cart/cartApi";
import toast from "react-hot-toast";

export const useCart = () => {
	const { data, isLoading, isFetching, isError, error, refetch } =
		useGetCartQuery();

	const [addToCartMutation, { isLoading: isAdding }] = useAddToCartMutation();
	const [removeFromCartMutation, { isLoading: isRemoving }] =
		useRemoveFromCartMutation();
	const [updateCartItemMutation, { isLoading: isUpdating }] =
		useUpdateCartItemMutation();
	const [clearCartMutation, { isLoading: isClearing }] = useClearCartMutation();

	// Extract cart data safely
	const cart = data?.data || { items: [] };
	const items = cart.items;

	// Derived values
	const totalQuantity = cart.totalProducts;

	const totalValue = cart.totalValue;

	// Actions
	const addToCart = async ({ productId, size, quantity }) => {
		await addToCartMutation({ productId, size, quantity })
			.unwrap()
			.then((response) => {
				toast.success(response.message);
			})
			.catch((error) => {
				toast.error(error.data.message);
				console.log(error.data.message);
			});
	};

	const removeFromCart = async ({ productId, size }) => {
		await removeFromCartMutation({ productId, size })
			.unwrap()
			.then((response) => {
				toast.success(response.message);
			})
			.catch((error) => {
				toast.error(error.data.message);
				console.log(error.data.message);
			});
	};

	const updateCartItem = async ({ productId, size, quantity }) => {
		await updateCartItemMutation({ productId, size, quantity })
			.unwrap()
			.then((response) => {
				toast.success(response.message);
			})
			.catch((error) => {
				toast.error(error.data.message);
				console.log(error.data.message);
			});
	};

	const clearCart = async () => {
		await clearCartMutation()
			.unwrap()
			.then((response) => {
				toast.success(response.message);
			})
			.catch((error) => {
				toast.error(error.data.message);
				console.log(error.data.message);
			});
	};

	const isInCart = (productId, size) => {
		return items.some(
			(item) => item.product === productId && item.size === size
		);
	};

	const getQuantityInCart = (productId, size) => {
		const item = items.find(
			(item) => item.product === productId && item.size === size
		);
		return item ? item.quantity : 0;
	};

	return {
		// Data
		cart,
		items,
		totalQuantity,
		totalValue,

		// Status
		isLoading: isLoading || isFetching,
		isError,
		error,
		isAdding,
		isRemoving,
		isUpdating,
		isClearing,

		// Actions
		addToCart,
		removeFromCart,
		updateCartItem,
		clearCart,
		isInCart,
		getQuantityInCart,
		refetch,
	};
};
