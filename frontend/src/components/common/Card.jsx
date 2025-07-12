import React from "react";
import { HoverImage } from "./ImageUtil";

const Card = ({
	className = "",
	children,
	variant = "default",
	interactive = true,
	fullHeight = false,
}) => {
	const variantClasses = {
		default: "bg-base-100 border border-base-300/50 rounded-2xl shadow-lg",
		elevated:
			"bg-base-100 shadow-lg border border-base-300/50 rounded-xl hover:shadow-xl",
		minimal: "bg-base-200/50 border border-base-300/30 rounded-2xl shadow-lg",
		product:
			"bg-base-100 rounded-2xl shadow-lg border border-base-300/50 hover:border-primary/20 hover:shadow-xl",
		feature:
			"bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 rounded-2xl",
		glass:
			"bg-base-100/90 backdrop-blur-xs border border-base-300/30 rounded-2xl",
	};

	const interactiveClasses = interactive
		? "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
		: "transition-all duration-300";

	const heightClasses = fullHeight ? "h-full flex flex-col" : "";

	return (
		<div
			className={`card overflow-hidden ${variantClasses[variant]} ${interactiveClasses} ${heightClasses} ${className}`}
		>
			{children}
		</div>
	);
};

export const CardContent = ({
	className = "",
	children,
	padding = "default",
	centered = false,
}) => {
	const paddingClasses = {
		none: "",
		small: "p-4",
		default: "p-6",
		large: "p-8",
		xl: "p-10",
	};

	const alignmentClasses = centered
		? "card-body flex-col items-center text-center"
		: "card-body";

	return (
		<div
			className={`${paddingClasses[padding]} ${alignmentClasses} ${className}`}
		>
			{children}
		</div>
	);
};

export const CardTitle = ({
	className = "",
	children,
	size = "default",
	gradient = false,
}) => {
	const sizeClasses = {
		small: "text-sm font-medium",
		default: "text-base font-semibold",
		large: "text-lg font-semibold",
		xl: "text-xl font-bold",
		"2xl": "text-2xl font-bold",
	};

	const gradientClasses = gradient
		? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
		: "text-primary";

	return (
		<h2 className={`${sizeClasses[size]} ${gradientClasses} ${className}`}>
			{children}
		</h2>
	);
};

export const CardHeader = ({ className = "", children, bordered = true }) => {
	const borderClasses = bordered ? "border-b border-base-300/50" : "";

	return <div className={`p-6 ${borderClasses} ${className}`}>{children}</div>;
};

export const CardFooter = ({ className = "", children, bordered = true }) => {
	const borderClasses = bordered ? "border-t border-base-300/50" : "";

	return <div className={`p-6 ${borderClasses} ${className}`}>{children}</div>;
};

export const CardImage = ({
	src,
	alt,
	className = "",
	imageClass = "",
	overlay = false,
	children,
}) => {

	const overlayElement = overlay && (
		<div className="absolute inset-0 bg-gradient-to-t from-base-content/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
	);

	return (
		<div
			className={`relative overflow-hidden ${className}`}
		>
			<HoverImage
				src={src}
				alt={alt}
				className={`${imageClass}`}
				loading="lazy"
			/>
			{overlayElement}
			{children}
		</div>
	);
};

export const CardBadge = ({
	children,
	variant = "default",
	className = "",
	position = "top-right",
}) => {
	const variantClasses = {
		default: "bg-primary text-primary-content",
		secondary: "bg-secondary text-secondary-content",
		accent: "bg-accent text-accent-content",
		success: "bg-success text-success-content",
		warning: "bg-warning text-warning-content",
		error: "bg-error text-error-content",
		info: "bg-info text-info-content",
	};

	const positionClasses = {
		"top-left": "top-3 left-3",
		"top-right": "top-3 right-3",
		"bottom-left": "bottom-3 left-3",
		"bottom-right": "bottom-3 right-3",
	};

	return (
		<div
			className={`absolute ${positionClasses[position]} z-10 ${variantClasses[variant]} px-2 py-1 rounded-lg text-xs font-semibold shadow-lg ${className}`}
		>
			{children}
		</div>
	);
};

export default Card;
