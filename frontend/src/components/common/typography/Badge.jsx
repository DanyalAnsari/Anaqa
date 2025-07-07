import React from "react";

// Badge Components
export const FloatingBadge = ({
	className = "",
	variant = "accent",
	size = "small",
	children,
	...props
}) => {
	const variants = {
		accent: "bg-accent text-accent-content",
		success: "bg-success text-success-content",
	};
	const sizes = {
		small: "text-sm font-bold px-4 py-2",
		xs: " text-xs font-semibold px-2 py-1",
	};
	return (
		<div
			className={`absolute z-20 ${variants[variant]}  rounded-lg ${sizes[size]} shadow-lg backdrop-blur-sm ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const CategoryTag = ({ className = "", children, ...props }) => {
	return (
		<span
			className={`bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium border border-secondary/20 ${className}`}
			{...props}
		>
			{children}
		</span>
	);
};

export const StatusBadge = ({
	className = "",
	type = "info",
	children,
	...props
}) => {
	const typeClasses = {
		info: "bg-info/10 text-neutral border-info/20",
		neutral: "bg-neutral/10 text-neutral border-neutral/20",
		success: "bg-success/10 text-success border-success/20",
		primary: "bg-primary/10 text-primary border-primary/20",
		secondary: "bg-secondary/10 text-secondary border-secondary/20",
		accent: "bg-accent/10 text-accent border-accent/20",
		warning: "bg-warning/10 text-warning border-warning/20",
		error: "bg-error/10 text-error border-error/20",
	};

	return (
		<span
			className={`badge px-3 py-2 font-medium text-xs ${typeClasses[type]} ${className}`}
			{...props}
		>
			{children}
		</span>
	);
};

export const FeatureIcon = ({
	className = "",
	icon,
	bgColor = "info",
	...props
}) => {
	const bgClasses = {
		info: "bg-info/10",
		secondary: "bg-secondary/10",
		accent: "bg-accent/10",
		primary: "bg-primary/10",
		success: "bg-success/10",
	};

	const iconClasses = {
		info: "text-info",
		secondary: "text-secondary",
		accent: "text-accent",
		primary: "text-primary",
		success: "text-success",
	};

	return (
		<div
			className={`w-8 h-8 ${bgClasses[bgColor]} rounded-full flex items-center justify-center ${className}`}
			{...props}
		>
			{React.cloneElement(icon, {
				className: `w-4 h-4 ${iconClasses[bgColor]}`,
			})}
		</div>
	);
};
