import React, { useState } from "react";
import { Mail, Gift, ArrowRight, Check } from "lucide-react";

const NewsLetterBox = () => {
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		if (!email.trim()) return;

		setIsLoading(true);
		
		// Simulate API call
		setTimeout(() => {
			setIsSubscribed(true);
			setIsLoading(false);
			setEmail("");
		}, 1000);
	};

	if (isSubscribed) {
		return (
			<section className="py-16 md:py-20">
				<div className="max-w-4xl mx-auto text-center">
					<div className="bg-success/10 border border-success/20 rounded-2xl p-8 md:p-12">
						<div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
							<Check className="w-8 h-8 text-success" />
						</div>
						<h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
							Thank You for Subscribing!
						</h2>
						<p className="text-neutral leading-relaxed max-w-2xl mx-auto mb-6">
							You've successfully joined our newsletter. Check your email for a welcome message and your 20% discount code.
						</p>
						<button 
							onClick={() => setIsSubscribed(false)}
							className="btn btn-outline btn-success"
						>
							Subscribe Another Email
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16 md:py-20">
			<div className="max-w-4xl mx-auto">
				<div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
					{/* Header */}
					<div className="flex items-center justify-center gap-3 mb-6">
						<div className="w-12 h-1 bg-secondary rounded-full"></div>
						<span className="text-secondary font-medium text-sm tracking-wider uppercase">
							Special Offer
						</span>
						<div className="w-12 h-1 bg-secondary rounded-full"></div>
					</div>

					{/* Discount Badge */}
					<div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
						<Gift className="w-4 h-4" />
						20% OFF Your First Order
					</div>

					{/* Main Content */}
					<h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
						Subscribe & Save Big!
					</h2>
					<p className="text-neutral text-lg leading-relaxed max-w-2xl mx-auto mb-8">
						Join our exclusive newsletter and be the first to know about new arrivals, 
						special promotions, and get instant access to your welcome discount.
					</p>

					{/* Newsletter Form */}
					<form onSubmit={onSubmitHandler} className="max-w-md mx-auto">
						<div className="flex flex-col sm:flex-row gap-3">
							<div className="flex-1 relative">
								<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral/50" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email address"
									className="input input-bordered w-full pl-12 pr-4 py-3 bg-base-100 border-base-300/50 focus:border-primary focus:outline-none transition-colors"
									required
								/>
							</div>
							<button
								type="submit"
								disabled={isLoading}
								className="btn btn-primary group px-6 shadow-lg hover:shadow-xl transition-all duration-300"
							>
								{isLoading ? (
									<span className="loading loading-spinner loading-sm"></span>
								) : (
									<>
										Subscribe
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</>
								)}
							</button>
						</div>
					</form>

					{/* Trust Indicators */}
					<div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-neutral">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-success rounded-full"></div>
							<span>No spam, ever</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-success rounded-full"></div>
							<span>Unsubscribe anytime</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-success rounded-full"></div>
							<span>Exclusive offers</span>
						</div>
					</div>

					{/* Features Grid */}
					<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								title: "Early Access",
								description: "Be first to shop new collections",
								icon: "🚀"
							},
							{
								title: "Special Discounts",
								description: "Exclusive subscriber-only deals",
								icon: "💰"
							},
							{
								title: "Style Tips",
								description: "Weekly fashion insights & trends",
								icon: "✨"
							}
						].map((feature, index) => (
							<div key={index} className="text-center">
								<div className="text-2xl mb-3">{feature.icon}</div>
								<h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
								<p className="text-sm text-neutral">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewsLetterBox;