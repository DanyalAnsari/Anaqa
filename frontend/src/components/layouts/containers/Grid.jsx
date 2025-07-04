import React from "react";

export const ProductsGrid = ({ className, children }) => {
	return (
		<div
			className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
		>
			{children}
		</div>
	);
};
export const FeaturesGrid = ({ className, children }) => {
	return (
		<div className={`grid grid-cols-1 md:grid-cols-3 gap-10 ${className}`}>
			{children}
		</div>
	);
};
export const CategoryGrid = ({ className, children }) => {
	return (
		<div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
			{children}
		</div>
	);
};
