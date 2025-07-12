import React from "react";
import { CreditCard, Banknote } from "lucide-react";
import Card from "@/components/common/Card";
import { H4 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";

const PaymentMethodSelector = ({ register, errors, watch }) => {
	const selectedMethod = watch("paymentMethod");

	const paymentMethods = [
		{
			id: "COD",
			name: "Cash on Delivery",
			icon: Banknote,
			description: "Pay when you receive",
			badge: null,
		},
		{
			id: "stripe",
			name: "Stripe",
			icon: CreditCard,
			description: "Secure payment with Stripe",
			badge: "Popular",
		},
	];

	return (
		<Card className="p-8">
			<div className="mb-6">
				<H4 className="mb-2">Payment Method</H4>
				<TextBody variant="small">
					Choose your preferred payment option
				</TextBody>
			</div>

			<div className="space-y-4">
				{paymentMethods.map((method) => {
					const Icon = method.icon;
					return (
						<label
							key={method.id}
							className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:border-primary/50 ${
								selectedMethod === method.id
									? "border-primary bg-base-300/40 shadow-lg"
									: "border-base-200/50 hover:shadow-md"
							}`}
						>
							<input
								{...register("paymentMethod", {
									required: "Please select a payment method",
								})}
								type="radio"
								value={method.id}
								className="radio radio-primary mr-4"
							/>

							<div className="flex-1 flex items-center gap-4">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center ${
										selectedMethod === method.id
											? "bg-primary/10"
											: "bg-base-200"
									}`}
								>
									<Icon
										className={`w-5 h-5 ${
											selectedMethod === method.id
												? "text-primary"
												: "text-neutral"
										}`}
									/>
								</div>

								<div className="flex-1">
									<div className="flex items-center gap-2 mb-1">
										<h4 className="font-semibold text-primary">
											{method.name}
										</h4>
										{method.badge && (
											<span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium border border-secondary/20">
												{method.badge}
											</span>
										)}
									</div>
									<p className="text-sm text-neutral">{method.description}</p>
								</div>
							</div>
						</label>
					);
				})}
			</div>

			{errors.paymentMethod && (
				<div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
					<span className="text-error text-sm">
						{errors.paymentMethod.message}
					</span>
				</div>
			)}
		</Card>
	);
};

export default PaymentMethodSelector;
