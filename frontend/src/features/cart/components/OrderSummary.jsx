import React, { useState } from "react";
import { H3 } from "@/components/common/typography/Headings";
import { ArrowRight, Shield, Truck } from "lucide-react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Buttons";
import {
	FlexContainer,
	HoverIconContainer,
} from "@/components/layouts/containers/Container";
import { TextBody } from "@/components/common/typography/Text";
import { useNavigate } from "react-router";

const OrderSummary = ({ cartSummary }) => {
	const navigate = useNavigate();
	const [couponCode, setCouponCode] = useState("");
	const [showCouponInput, setShowCouponInput] = useState(false);
	const handleCouponSubmit = (e) => {
		e.preventDefault();
		if (couponCode.trim()) {
			setCouponCode("");
			setShowCouponInput(false);
		}
	};
	return (
		<div className="lg:col-span-1">
			<Card variant="minimal" className="shadow-lg p-6 sticky top-6">
				<H3 className="mb-6">Order Summary</H3>

				{/* Coupon Section */}
				<div className="mb-6">
					{!showCouponInput ? (
						<Button
							variant="secondary"
							action={() => setShowCouponInput(true)}
							className="btn-sm btn-block"
						>
							Have a coupon code?
						</Button>
					) : (
						<FlexContainer className="gap-2">
							<input
								type="text"
								value={couponCode}
								onChange={(e) => setCouponCode(e.target.value)}
								placeholder="Enter coupon code"
								className="input flex-1 bg-base-100 border-base-300"
								onKeyPress={(e) => e.key === "Enter" && handleCouponSubmit(e)}
							/>
							<Button action={handleCouponSubmit} className="btn-sm">
								Apply
							</Button>
						</FlexContainer>
					)}
				</div>

				{/* Summary Details */}
				<div className="space-y-4 mb-6">
					<FlexContainer justify="between">
						<TextBody>Subtotal ({cartSummary.totalQuantity} items)</TextBody>
						<span className="font-semibold text-primary">
							₹{cartSummary.totalValue}
						</span>
					</FlexContainer>

					{cartSummary.discount > 0 && (
						<FlexContainer justify="between" className="text-success">
							<span>Discount</span>
							<span>-₹{cartSummary.discount}</span>
						</FlexContainer>
					)}

					<FlexContainer justify="between">
						<TextBody>Shipping</TextBody>
						<span className="font-semibold text-primary">
							{cartSummary.shipping === 0 ? "Free" : `₹${cartSummary.shipping}`}
						</span>
					</FlexContainer>

					<FlexContainer justify="between">
						<TextBody>Tax</TextBody>
						<span className="font-semibold text-primary">
							₹{cartSummary.tax}
						</span>
					</FlexContainer>

					<div className="divider my-4"></div>

					<FlexContainer justify="between" className="text-xl font-bold">
						<span className="text-primary">Total</span>
						<span className="text-primary">₹{cartSummary.total}</span>
					</FlexContainer>
				</div>

				{/* Checkout Button */}
				<Button action={() => navigate("/checkout")} className="mb-4 btn-block">
					Proceed to Checkout
					<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
				</Button>

				{/* Trust Badges */}
				<div className="grid grid-cols-2 gap-4 text-center">
					<HoverIconContainer className="gap-2 p-3 bg-base-200/50 border-base-300/50">
						<Shield className="w-6 h-6 text-info" />
						<TextBody variant="caption">Secure Payment</TextBody>
					</HoverIconContainer>
					<HoverIconContainer className="gap-2 p-3 bg-base-200/50  border-base-300/50">
						<Truck className="w-6 h-6 text-success" />
						<TextBody variant="caption">Free Shipping</TextBody>
					</HoverIconContainer>
				</div>
			</Card>
		</div>
	);
};

export default OrderSummary;
