import React from "react";

export const ImageOverlay = ({
	className = "",
	variant = "main",
	children,
	...props
}) => {
	const variants = {
		main: "from-base-content/20",
		card: "from-primary/20 via-primary/5",
	};
	return (
		<div
			className={`absolute inset-0 bg-gradient-to-t ${variants[variant]}  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const HoverImage = ({ className = "", src, alt, ...props }) => {
	return (
		<img
			className={`transition-transform duration-700 hover:scale-105 ${className}`}
			src={src}
			alt={alt}
			{...props}
		/>
	);
};

export const ProductImage = ({ className = "", src, alt, ...props }) => {
	return (
		<img
			className={`w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 ${className}`}
			src={src}
			alt={alt}
			{...props}
		/>
	);
};
