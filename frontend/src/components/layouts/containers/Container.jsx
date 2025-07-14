import React from "react";

// Container Components
const Container = ({ className = "", children }) => {
	return (
		<div className={`max-w-7xl mx-auto px-4 ${className}`}>{children}</div>
	);
};

export const LayoutContainer = ({ className = "", children }) => {
	return (
		<div className={`sm:px-[5vw] md:px-[7vw] lg:px-[9vw] px-4 ${className}`}>
			{children}
		</div>
	);
};

export const ResponsiveContainer = ({ className = "", children, ...props }) => {
	return (
		<div
			className={`flex flex-col lg:flex-row-reverse ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const FlexContainer = ({
	className = "",
	direction = "row",
	align = "center",
	justify = "center",
	children,
	...props
}) => {
	const directionClasses = {
		row: "flex-row",
		"row-reverse": "flex-row-reverse",
		column: "flex-col",
		"column-reverse": "flex-col-reverse",
	};

	const alignClasses = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
		stretch: "items-stretch",
	};

	const justifyClasses = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
		around: "justify-around",
		evenly: "justify-evenly",
	};

	return (
		<div
			className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const SectionContainer = ({
	className = "",
	size = "large",
	children,
	...props
}) => {
	const sizeClasses = {
		large: "py-20",
		medium: "py-16 md:py-20",
		small: "py-12",
		minimal: "py-8",
	};

	return (
		<section className={`${sizeClasses[size]} ${className}`} {...props}>
			{children}
		</section>
	);
};

export const GridContainer = ({
	className = "",
	columns = "products",
	children,
	...props
}) => {
	const gridClasses = {
		products:
			"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
		features: "grid grid-cols-1 md:grid-cols-3 gap-10",
		categories: "grid grid-cols-2 md:grid-cols-4 gap-6",
		grid: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6",
		list: "grid grid-cols-1 max-w-4xl gap-6",
		two: "grid grid-cols-1 lg:grid-cols-2 gap-6",
		three: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
		four:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
	};

	return (
		<div className={`${gridClasses[columns]} ${className}`} {...props}>
			{children}
		</div>
	);
};

export const HoverIconContainer = ({
	className = "",
	children,
	hoverEffect = "scale-105",
	...props
}) => {
	return (
		<div
			className={`flex items-center justify-center flex-col rounded-2xl cursor-pointer transition-all duration-300 border hover:shadow-lg hover:${hoverEffect} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const IconBaseContainer = ({
	className = "",
	children,
	hoverEffect = "scale-105",
	margin = "mx-auto",
	...props
}) => {
	return (
		<div
			className={`flex items-center justify-center rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300 border hover:${hoverEffect} ${margin} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const FilterInputsContainer = ({ title, children }) => {
	return (
		<fieldset className="space-y-3 fieldset bg-base-200 border-base-300 rounded-box border p-4">
			<legend className="fieldset-legend text-sm">{title}</legend>
			{children}
		</fieldset>
	);
};

export default Container;
