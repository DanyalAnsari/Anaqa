import React from "react";

export const TextBody = ({ className, variant = "regular", children }) => {
	const textClass = textBodyVariant[variant] || textBodyVariant.regular;

	return <p className={`${textClass} ${className}`}>{children}</p>;
};

const textBodyVariant = {
	large: "text-lg text-neutral leading-relaxed",
	regular: "text-base text-neutral",
	small: "text-sm text-neutral",
	Caption: "text-xs text-neutral",
	label: "text-sm font-medium text-primary",
	badge: "text-sm font-semibold uppercase tracking-wider",
};
