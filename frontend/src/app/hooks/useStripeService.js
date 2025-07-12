// src/features/checkout/services/stripeService.js
import { useCreateOrderByStripeMutation } from "@/features/checkout/orderApi";

export const useStripeCheckout = () => {
	const [createStripeOrder, { isLoading }] = useCreateOrderByStripeMutation();

	const initiateStripeCheckout = async (orderData) => {
		try {
			const response = await createStripeOrder({
				...orderData,
				origin: window.location.origin,
			}).unwrap();

			// Redirect to Stripe checkout
			window.location.href = response.checkoutUrl;
		} catch (error) {
			throw new Error(
				error.data?.message || "Failed to initiate Stripe checkout"
			);
		}
	};

	return {
		initiateStripeCheckout,
		isLoading,
	};
};
