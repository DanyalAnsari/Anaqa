import React from "react";

export const H1 = ({ className = "", children, ...props }) => {
	return (
		<h1
			className={`text-4xl lg:text-6xl font-bold text-primary ${className}`}
			{...props}
		>
			{children}
		</h1>
	);
};

export const H2 = ({ className = "", children, ...props }) => {
	return (
		<h2 className={`text-4xl font-bold text-primary ${className}`} {...props}>
			{children}
		</h2>
	);
};

export const H3 = ({ className = "", children, ...props }) => {
	return (
		<h3
			className={`text-2xl lg:text-3xl font-bold text-primary ${className}`}
			{...props}
		>
			{children}
		</h3>
	);
};

export const H4 = ({ className = "", children, ...props }) => {
	return (
		<h4
			className={`text-xl font-semibold text-primary ${className}`}
			{...props}
		>
			{children}
		</h4>
	);
};

export const H5 = ({ className = "", children, ...props }) => {
	return (
		<h5
			className={`text-lg font-semibold text-primary ${className}`}
			{...props}
		>
			{children}
		</h5>
	);
};

export const H6 = ({ className = "", children, ...props }) => {
	return (
		<h6
			className={`text-base font-semibold text-primary ${className}`}
			{...props}
		>
			{children}
		</h6>
	);
};
