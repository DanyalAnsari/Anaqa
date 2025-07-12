import React from "react";



// Text Components
export const BodyLarge = ({ className = "", children, ...props }) => {
	return (
		<p
			className={`text-lg text-neutral leading-relaxed ${className}`}
			{...props}
		>
			{children}
		</p>
	);
};

export const BodyRegular = ({ className = "", children, ...props }) => {
	return (
		<p className={`text-base text-neutral ${className}`} {...props}>
			{children}
		</p>
	);
};

export const BodySmall = ({ className = "", children, ...props }) => {
	return (
		<p className={`text-sm text-neutral ${className}`} {...props}>
			{children}
		</p>
	);
};

export const Caption = ({ className = "", children, ...props }) => {
	return (
		<span className={`text-xs text-neutral ${className}`} {...props}>
			{children}
		</span>
	);
};

export const Label = ({ className = "", children, ...props }) => {
	return (
		<label
			className={`text-sm font-medium text-primary ${className}`}
			{...props}
		>
			{children}
		</label>
	);
};

export const BadgeText = ({ className = "", children, ...props }) => {
	return (
		<span
			className={`text-xs font-semibold uppercase tracking-wider ${className}`}
			{...props}
		>
			{children}
		</span>
	);
};
