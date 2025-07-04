import React from "react";

const Button = ({ className = "", variant = "primary", action, children }) => {
	action = action || (() => {});
	const buttonClass = variation[variant] || variation.primary;
	return (
		<button className={`${buttonClass} ${className}`} onClick={action}>
			{children}
		</button>
	);
};

const variation = {
	primary: "btn btn-primary btn-lg group border-0 shadow-md hover:shadow-lg",
	secondary:
		"btn btn-outline btn-lg border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary",
	small: "btn btn-outline btn-primary btn-sm hover:btn-primary",
	Icon: "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
};

export default Button;
