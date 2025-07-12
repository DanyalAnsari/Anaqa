import React from "react";
import {
	Home,
	ArrowLeft,
	Shirt,
	ShoppingBag,
	Sparkles,
	MapPin,
	Heart,
	Star,
	Store,
} from "lucide-react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleShop = () => {
		navigate("/products");
	};

	const popularCategories = [
		{ name: "Women's Fashion", icon: ShoppingBag, path: "/category/women" },
		{ name: "Men's Fashion", icon: Shirt, path: "/category/men" },
		{ name: "New Arrivals", icon: Sparkles, path: "/category/new-arrivals" },
		{ name: "Sale Items", icon: Heart, path: "/category/sale" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
			<div className="max-w-6xl mx-auto px-4 py-20">
				{/* Main 404 Section */}
				<div className="text-center mb-20">
					{/* Large 404 Graphic */}
					<div className="relative mb-12">
						<div className="text-[12rem] lg:text-[16rem] font-bold text-primary/10 leading-none select-none">
							404
						</div>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300/50">
								<MapPin className="w-16 h-16 text-secondary mx-auto mb-4" />
								<div className="text-2xl font-semibold text-primary">
									Style Not Found
								</div>
							</div>
						</div>
					</div>

					{/* Section Header */}
					<div className="mb-12">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="w-12 h-1 bg-secondary rounded-full"></div>
							<span className="text-secondary font-medium text-sm tracking-wider uppercase">
								Fashion Emergency
							</span>
							<div className="w-12 h-1 bg-secondary rounded-full"></div>
						</div>
						<h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
							This Look Isn't Available
						</h1>
						<p className="text-lg text-neutral leading-relaxed max-w-2xl mx-auto">
							The page you're looking for has walked off the runway! Don't worry
							though, we have plenty of other stunning styles waiting for you to
							discover.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
						<button
							onClick={handleGoHome}
							className="btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl"
						>
							<Home className="w-5 h-5 mr-2" />
							Back to Fashion Hub
							<ArrowLeft className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform rotate-180" />
						</button>

						<button
							onClick={handleGoBack}
							className="btn btn-outline btn-lg border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							Previous Page
						</button>

						<button
							onClick={handleShop}
							className="btn btn-outline btn-lg border-accent text-accent hover:bg-accent hover:text-accent-content hover:border-accent"
						>
							<Store className="w-5 h-5 mr-2" />
							Find Your Style
						</button>
					</div>
				</div>

				{/* Popular Categories Section */}
				<div className="border-t border-base-300/30 pt-16">
					<div className="text-center mb-12">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="w-12 h-1 bg-secondary rounded-full"></div>
							<span className="text-secondary font-medium text-sm tracking-wider uppercase">
								Trending Collections
							</span>
							<div className="w-12 h-1 bg-secondary rounded-full"></div>
						</div>
						<h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
							Discover Your Perfect Style
						</h2>
						<p className="text-neutral text-lg max-w-2xl mx-auto">
							Browse our most popular collections and find the perfect outfit
							for any occasion
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
						{popularCategories.map((category, index) => (
							<div
								key={index}
								onClick={() => navigate(category.path)}
								className="group cursor-pointer bg-base-100 rounded-2xl p-6 border border-base-300/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
							>
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<category.icon className="w-8 h-8 text-secondary" />
									</div>
									<h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
										{category.name}
									</h3>
									<p className="text-sm text-neutral opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										Explore collection
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Help Section */}
				<div className="bg-gradient-to-br from-info/5 to-info/10 rounded-2xl p-8 lg:p-12 text-center">
					<div className="max-w-2xl mx-auto">
						<div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-6">
							<Star className="w-8 h-8 text-info" />
						</div>
						<h3 className="text-2xl font-bold text-primary mb-4">
							Need Fashion Advice?
						</h3>
						<p className="text-neutral leading-relaxed mb-6">
							Our style experts are here to help you find the perfect outfit.
							Get personalized recommendations and styling tips.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl">
								<Heart className="w-5 h-5 mr-2" />
								Style Quiz
								<Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
							</button>
							<button className="btn btn-outline btn-lg border-info text-info hover:bg-info hover:text-info-content hover:border-info">
								<ShoppingBag className="w-5 h-5 mr-2" />
								Contact Stylist
							</button>
						</div>
					</div>
				</div>

				{/* Footer Message */}
				<div className="text-center mt-16 pt-8 border-t border-base-300/30">
					<p className="text-sm text-neutral">
						Lost? Don't worry, even the best-dressed people sometimes take a
						wrong turn!
						<span className="text-secondary font-medium">
							{" "}
							Let's get you back on track.
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
