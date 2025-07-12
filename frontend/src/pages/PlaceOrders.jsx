import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import DeliveryInformationForm from "@/features/checkout/components/DeliveryInformationForm";
import OrderSummary from "@/features/checkout/components/OrderSummary";
import PaymentMethodSelector from "@/features/checkout/components/PaymentMethodSelector";
import GradientBackground from "@/components/layouts/containers/Gradients";
import Container from "@/components/layouts/containers/Container";
import { SectionHeader } from "@/components/common/Headers";
import Button from "@/components/common/Buttons";
import { useOrders } from "@/app/hooks/useOrders";
import toast from "react-hot-toast";
import {
	LoadingComponent,
	LoadingSpinner,
} from "@/components/common/typography/LoadingComp";

const PlaceOrder = () => {
	// Hooks

	const {
		cartItems,
		cartTotal,
		placeOrderByCOD,
		placeOrderByStripe,
		isLoading,
	} = useOrders();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Constants
	const DELIVERY_FEE = 15.0;
	const totalAmount = cartTotal + DELIVERY_FEE;

	// Form handling
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		reset,
		setValue,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			street: "",
			city: "",
			state: "",
			zipcode: "",
			country: "",
			phone: "",
			paymentMethod: "COD",
		},
	});

	const onSubmit = async (data) => {
		if (cartItems.length === 0) {
			toast.error("Your cart is empty");
			return;
		}

		setIsSubmitting(true);

		try {
			const orderData = {
				address: data,
				products: cartItems.map((item) => ({
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					size: item.size,
					image: item.image,
				})),
				amount: totalAmount,
				paymentMethod: data.paymentMethod,
			};

			if (data.paymentMethod === "COD") {
				await placeOrderByCOD(orderData);
				reset();
				toast.success("Order placed successfully!");
			} else {
				// Handle other payment methods
				await placeOrderByStripe(orderData);
				reset();
				toast.loading("Redirecting");
			}
		} catch (error) {
			console.error("Order error:", error);
			toast.error(error.message || "Failed to place order");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return <LoadingComponent />;
	}

	return (
		<GradientBackground className="min-h-screen">
			<Container className="py-12">
				<SectionHeader
					label="CHECKOUT"
					heading="Complete Your Order"
					description="Just a few more steps to get your products delivered to your doorstep"
				/>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
						{/* Left Column - Forms */}
						<div className="lg:col-span-3 space-y-8">
							<DeliveryInformationForm register={register} errors={errors} />
						</div>

						{/* Right Column - Order Summary */}
						<div className="space-y-8 lg:col-span-2">
							<OrderSummary subtotal={cartTotal} deliveryFee={DELIVERY_FEE} />

							<PaymentMethodSelector
								setValue={setValue}
								register={register}
								errors={errors}
								watch={watch}
							/>

							<Button
								type="submit"
								disabled={!isValid || isSubmitting || cartItems.length === 0}
								className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? (
									<>
										<span className="loading loading-spinner loading-sm"></span>
										Processing...
									</>
								) : (
									<>
										Place Order
										<CheckCircle className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
									</>
								)}
							</Button>
						</div>
					</div>
				</form>
			</Container>
		</GradientBackground>
	);
};

export default PlaceOrder;
