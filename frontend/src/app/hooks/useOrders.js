import {
	useCreateOrderByCodMutation,
	useCreateOrderByStripeMutation,
	useGetUserOrdersQuery,
	useVerifyStripePaymentMutation,
} from "@/features/checkout/orderApi";
import toast from "react-hot-toast";
import { useCart } from "./useCart";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export const useOrders = () => {
	const navigate = useNavigate();
	// Order-related queries
	const {
		data,
		isLoading: isOrdersLoading,
		isFetching: isOrdersFetching,
		isError: isOrdersError,
		error: ordersError,
		refetch,
	} = useGetUserOrdersQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	// Order mutations
	const [createOrderByCod, { isLoading: isCreatingCodOrder }] =
		useCreateOrderByCodMutation();
	const [createOrderByStripe, { isLoading: isCreatingStripeOrder }] =
		useCreateOrderByStripeMutation();
	const [verifyStripePayment] = useVerifyStripePaymentMutation();

	// Cart and auth data
	const {
		items: cartItems,
		totalValue: cartTotal,
		isLoading: isCartLoading,
	} = useCart();

	// Derived values
	const orders = data?.data || [];
	const orderCount = orders.length;
	const isLoading = isOrdersLoading || isCartLoading;
	const isCreatingOrder = isCreatingCodOrder || isCreatingStripeOrder;

	const placeOrderByCOD = async (orderData) => {
		try {
			const response = await createOrderByCod(orderData).unwrap();
			toast.success(response.message);
			return response;
		} catch (error) {
			handleOrderError(error);
			throw error;
		}
	};

	const placeOrderByStripe = async (orderData) => {
		try {
			const response = await createOrderByStripe(orderData).unwrap();
			// Redirect to Stripe checkout
			window.location.href = response.data.checkoutUrl;
		} catch (error) {
			handleOrderError(error);
			throw error;
		}
	};

	const verifyStripeOrder = useCallback(
		async (orderId, success) => {
			try {
				if (orderId && success) {
					await verifyStripePayment({ orderId, success }).unwrap();
					navigate("/orders");
					toast.success("Your order has been placed Successfully");
				} else {
					navigate("/cart");
					toast.error("Payment verification failed. Please try again");
				}
			} catch (error) {
				toast.error(error.data?.message || "Payment verification failed");
				throw error;
			}
		},
		[navigate, verifyStripePayment]
	);

	const handleOrderError = (error) => {
		const errorMessage = error.data?.message || "Failed to process order";
		toast.error(errorMessage);
		console.error("Order error:", error);
	};

	return {
		// Data
		orders,
		orderCount,
		cartItems,
		cartTotal,

		// Status
		isLoading,
		isFetching: isOrdersFetching,
		isError: isOrdersError,
		error: ordersError,
		isCreatingOrder,
		isEmpty: !isLoading && orders.length === 0,

		// Actions
		placeOrderByCOD,
		placeOrderByStripe,
		verifyStripeOrder,
		refetchOrders: refetch,
	};
};
