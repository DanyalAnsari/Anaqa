import React from "react";
import { TextBody } from "./Text";

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
			className={`absolute z-20 ${variants[variant]}  rounded-lg ${sizes[size]} shadow-lg backdrop-blur-xs ${className}`}
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
	text = "text-xs",
	children,
	...props
}) => {
	const typeClasses = {
		info: "bg-info/20 text-neutral border-info/50",
		neutral: "bg-neutral/20 text-neutral border-neutral/50",
		success: "bg-success/20 text-success border-success/50",
		primary: "bg-primary/20 text-primary border-primary/50",
		secondary: "bg-secondary/20 text-secondary border-secondary/50",
		accent: "bg-accent/20 text-accent border-accent/50",
		warning: "bg-warning/20 text-warning border-warning/50",
		error: "bg-error/20 text-error border-error/50",
	};

	return (
		<span
			className={`badge px-4 py-2 font-medium ${text} ${typeClasses[type]} ${className}`}
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

export const Avatar = ({ children, containerClass, className }) => {
	return (
		<div className={`avatar avatar-placeholder ${containerClass}`}>
			<div className={`w-10 bg-secondary/30 rounded-full ${className}`}>
				<TextBody variant="badge">{children}</TextBody>
			</div>
		</div>
	);
};
