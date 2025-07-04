import React from "react";

const Divider = ({ className, size, variant, children }) => {
	const divider = dividerVariants[variant] || "divider";
	const dividerSize = sizes[size] || sizes.medium;

	return (
		<div className={`${divider} ${dividerSize} h-1 rounded-full ${className}`}>
			{children}
		</div>
	);
};

const sizes = {
	small: "w-12",
	medium: "w-16",
	large: "w-24",
};
const dividerVariants = {
	end: "divider-end",
	start: "divider-start",
};
export default Divider;
