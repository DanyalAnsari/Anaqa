import { useOrders } from "@/app/hooks/useOrders";
import {
	CheckCircle,
	XCircle,
	Loader2,
	Package,
	CreditCard,
	ArrowRight,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const Verify = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get("orderId");
	const success = searchParams.get("success");
	const [verificationStatus, setVerificationStatus] = useState("verifying"); // "verifying", "success", "failed"

	const { verifyStripeOrder } = useOrders();

	const verifyPayment = useCallback(async () => {
		try {
			await verifyStripeOrder(orderId, success);
			setVerificationStatus("success");
			toast.success("Payment verified successfully!");
		} catch (error) {
			setVerificationStatus("failed");
			toast.error("Payment verification failed");
			console.error("Verification error:", error);
			setTimeout(() => navigate("/"), 60000);
		}
	}, [navigate, orderId, success, verifyStripeOrder]);

	useEffect(() => {
		if (orderId && success !== null) {
			verifyPayment();
		}
	}, [orderId, success, verifyPayment]);

	const handleContinueShopping = () => {
		navigate("/");
	};

	const handleViewOrders = () => {
		navigate("/orders");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
			<div className="max-w-4xl mx-auto px-4 py-20">
				<div className="text-center">
					{/* Status Icon and Animation */}
					<div className="flex justify-center mb-8">
						{verificationStatus === "verifying" && (
							<div className="relative">
								<div className="w-24 h-24 bg-info/10 rounded-full flex items-center justify-center">
									<Loader2 className="w-12 h-12 text-info animate-spin" />
								</div>
								<div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-info/20 animate-pulse"></div>
							</div>
						)}

						{verificationStatus === "success" && (
							<div className="relative">
								<div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center border-2 border-success/20">
									<CheckCircle className="w-12 h-12 text-success" />
								</div>
								<div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-success/30 animate-ping"></div>
							</div>
						)}

						{verificationStatus === "failed" && (
							<div className="relative">
								<div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center border-2 border-error/20">
									<XCircle className="w-12 h-12 text-error" />
								</div>
								<div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-error/30 animate-pulse"></div>
							</div>
						)}
					</div>

					{/* Status Messages */}
					{verificationStatus === "verifying" && (
						<div className="mb-12">
							<h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
								Verifying Your Payment
							</h1>
							<p className="text-lg text-neutral leading-relaxed max-w-2xl mx-auto mb-8">
								Please wait while we confirm your payment and prepare your
								order. This process usually takes just a few moments.
							</p>
							<div className="flex items-center justify-center gap-3 text-info">
								<div className="w-2 h-2 bg-info rounded-full animate-bounce"></div>
								<div
									className="w-2 h-2 bg-info rounded-full animate-bounce"
									style={{ animationDelay: "0.1s" }}
								></div>
								<div
									className="w-2 h-2 bg-info rounded-full animate-bounce"
									style={{ animationDelay: "0.2s" }}
								></div>
							</div>
						</div>
					)}

					{verificationStatus === "success" && (
						<div className="mb-12">
							<h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
								Payment Successful!
							</h1>
							<p className="text-lg text-neutral leading-relaxed max-w-2xl mx-auto mb-8">
								Thank you for your purchase! Your payment has been confirmed and
								your order is being processed. You'll receive a confirmation
								email shortly.
							</p>
							{orderId && (
								<div className="bg-success/5 border border-success/20 rounded-2xl p-6 max-w-md mx-auto mb-8">
									<div className="flex items-center gap-3 mb-3">
										<Package className="w-5 h-5 text-success" />
										<span className="text-success font-semibold">
											Order Details
										</span>
									</div>
									<p className="text-sm text-neutral">
										<span className="font-medium">Order ID:</span> {orderId}
									</p>
								</div>
							)}
						</div>
					)}

					{verificationStatus === "failed" && (
						<div className="mb-12">
							<h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
								Payment Verification Failed
							</h1>
							<p className="text-lg text-neutral leading-relaxed max-w-2xl mx-auto mb-8">
								We encountered an issue while verifying your payment. Please
								don't worry - if your payment went through, we'll process your
								order. You'll be redirected to the home page shortly.
							</p>
							<div className="bg-error/5 border border-error/20 rounded-2xl p-6 max-w-md mx-auto mb-8">
								<div className="flex items-center gap-3 mb-3">
									<CreditCard className="w-5 h-5 text-error" />
									<span className="text-error font-semibold">
										What to do next
									</span>
								</div>
								<p className="text-sm text-neutral">
									Check your email for a confirmation or contact our support
									team if you need assistance.
								</p>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					{verificationStatus === "success" && (
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								onClick={handleViewOrders}
								className="btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl"
							>
								<Package className="w-5 h-5 mr-2" />
								View My Orders
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</button>
							<button
								onClick={handleContinueShopping}
								className="btn btn-outline btn-lg border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary"
							>
								Continue Shopping
							</button>
						</div>
					)}

					{verificationStatus === "failed" && (
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								onClick={handleContinueShopping}
								className="btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl"
							>
								Back to Home
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</button>
						</div>
					)}
				</div>

				{/* Trust Indicators */}
				<div className="mt-20 border-t border-base-300/30 pt-16">
					<div className="text-center mb-12">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="w-12 h-1 bg-secondary rounded-full"></div>
							<span className="text-secondary font-medium text-sm tracking-wider uppercase">
								Secure & Trusted
							</span>
							<div className="w-12 h-1 bg-secondary rounded-full"></div>
						</div>
						<h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
							Your Security is Our Priority
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<CheckCircle className="w-8 h-8 text-info" />
							</div>
							<h3 className="text-lg font-semibold text-primary mb-2">
								Secure Payment
							</h3>
							<p className="text-sm text-neutral">
								256-bit SSL encryption protects your payment information
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Package className="w-8 h-8 text-success" />
							</div>
							<h3 className="text-lg font-semibold text-primary mb-2">
								Fast Processing
							</h3>
							<p className="text-sm text-neutral">
								Orders are processed within 24 hours
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<CreditCard className="w-8 h-8 text-secondary" />
							</div>
							<h3 className="text-lg font-semibold text-primary mb-2">
								Money Back Guarantee
							</h3>
							<p className="text-sm text-neutral">
								30-day return policy for your peace of mind
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Verify;
